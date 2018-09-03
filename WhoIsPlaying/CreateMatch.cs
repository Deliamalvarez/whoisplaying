using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.WindowsAzure.Storage.Table;
using Newtonsoft.Json;
using WhoIsPlaying.Common;

namespace WhoIsPlaying
{
    public static class CreateMatch
    {
        [FunctionName("createMatch")]
        public static async Task<HttpResponseMessage> Run([HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "createMatch/{id}")]HttpRequestMessage req, TraceWriter log, string id, [Table("game")] CloudTable gameTable,
            [Queue("EmailQueue")] IAsyncCollector<EmailDetails> emailsQueue, [Table("users")] CloudTable usersTable)
        {

            log.Info("Return Game detail.");

            TableOperation operation = TableOperation.Retrieve<EventTableEntity>("event", id);
            TableResult result = gameTable.Execute(operation);
            var game = (EventTableEntity)result.Result;
            if (game == null)
            {
                log.Warning($"Game not found {id}");
                return req.CreateResponse(HttpStatusCode.NotFound, "Game not found");
            }

            var query = new TableQuery<UserEntity>();
            var users = await usersTable.ExecuteQuerySegmentedAsync(query, null);

            var responses = JsonConvert.DeserializeObject<Response[]>(game.ResponsesJson).Where(r => r.IsPlaying.Equals("yes")).Select(t => new PlayerDetails() { Name = t.Name, Email = t.Email, Votes = getVotes(users.Results, t.Email) }).OrderByDescending(u => u.Votes ).ToList();
            var possibleTeam = new List<PlayerDetails>();
            var substitutes = new List<PlayerDetails>();
            var teamLength = 10;
            if (responses.Count() > teamLength)
            {
                possibleTeam = responses.Take(10).ToList();
                substitutes = responses.Skip(10).ToList();
            }
            var teams = await req.Content.ReadAsAsync<Teams>();

            if (teams == null)
            {
                teams = new Teams()
                {
                    team1 = responses.Where((t, index) => index % 2 == 0).ToList(),
                    team2 = responses.Where((t, index) => index % 2 != 0).ToList(),
                };
            }
            game.teams = JsonConvert.SerializeObject(teams);
            TableOperation update = TableOperation.Merge(game);
            TableResult updateResult = gameTable.Execute(update);
            var match = (EventTableEntity)result.Result;
            if (match == null)
            {
                log.Warning($"Game not found {id}");
                return req.CreateResponse(HttpStatusCode.InternalServerError, "Internal Error while updating the game");
            }

            var sb = new StringBuilder();
            sb.Append($"<p> Te confirmamos que el juego tendr&aacute; lugar en <b>{game.Location}</b> a las <b>{game.EventDateAndTime}</b> </p>");
            sb.Append($"<p> <b> Cuadro 1: </b></p>");
            sb.Append("<ul>");
            foreach (var t in teams.team1)
            {
                sb.Append($"<li>{t.Name}</li>");
            }
            sb.Append("</ul>");
            sb.Append($"<p> <b> Cuadro 2: </b></p>");
            sb.Append("<ul>");
            foreach (var t in teams.team2)
            {
                sb.Append($"<li>{t.Name}</li>");
            }
            sb.Append("</ul>");
            if (substitutes?.Count > 0)
            {
                sb.Append($"<p> <b> Suplentes: </b></p>");
                sb.Append("<ul>");
                foreach (var s in substitutes)
                {
                    sb.Append($"<li>{s.Name}</li>");
                }
                sb.Append("</ul>");
            }
            string message = sb.ToString();

            foreach (var r in responses)
            {
                var emailDetail = new EmailDetails
                {
                    Name = r.Name,
                    Email = r.Email,
                    Message = sb.ToString(),
                    Subject = "Partido confirmado"
                };
                await emailsQueue.AddAsync(emailDetail);
            }
            return req.CreateResponse(HttpStatusCode.OK, "Match created. An Email will be sent with game details");

        }

        private static double getVotes(List<UserEntity> users, string email)
        {
            var user = users.FirstOrDefault(u => u.Email.Equals(email, StringComparison.InvariantCultureIgnoreCase));
            if (user != null && user.VoteQuantity > 0)
            {
                return user.Votes / user.VoteQuantity;
            }
            return 0;
        }
    }
}
