using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.WindowsAzure.Storage.Table;
using Newtonsoft.Json;
using WhoIsPlaying.Common;

namespace WhoIsPlaying
{
    public static class VoteForPlayer
    {
        [FunctionName("voteForPlayer")]
        public static async Task<HttpResponseMessage> Run([HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "voteForPlayer/{id}")]HttpRequestMessage req, TraceWriter log, string id, [Table("game")] CloudTable gameTable, [Table("users")] CloudTable usersTable)
        {
            var votes = await req.Content.ReadAsAsync<List<PlayerDetails>>();

            if (votes == null)
            {
                log.Warning($"Game not found {id}");
                return req.CreateResponse(HttpStatusCode.NotFound, "Game not found");
            }

            TableOperation operation = TableOperation.Retrieve<EventTableEntity>("event", id);
            TableResult result = gameTable.Execute(operation);
            var game = (EventTableEntity)result.Result;
            if (game == null)
            {
                log.Warning($"Game not found {id}");
                return req.CreateResponse(HttpStatusCode.NotFound, "Game not found");
            }
            var currentvotes = new List<PlayerDetails>();
            if (!string.IsNullOrEmpty(game.votes))
            {
                currentvotes = JsonConvert.DeserializeObject<List<PlayerDetails>>(game.votes);
            }

            currentvotes.AddRange(votes);

            game.votes = JsonConvert.SerializeObject(currentvotes);

            TableOperation update = TableOperation.Merge(game);
            TableResult updated = gameTable.Execute(update);

            if (updated.Result == null)
            {
                log.Warning($"Game not found {id}");
                return req.CreateResponse(HttpStatusCode.InternalServerError, "Internal Error while updating votes");
            }
            var query = new TableQuery<UserEntity>();
            var items = await usersTable.ExecuteQuerySegmentedAsync(query, null);
            
            foreach (var vote in votes)
            {
                var user = items.Results.FirstOrDefault(i => i.Email == vote.Email);
                if (user != null)
                {
                    user.Votes += vote.Votes;
                    user.VoteQuantity++;
                    try
                    {
                        TableOperation updateUser = TableOperation.Replace(user);
                        TableResult updatedUser = usersTable.Execute(updateUser);
                        if (updatedUser.Result == null)
                        {
                            return req.CreateResponse(HttpStatusCode.InternalServerError, "Internal Error while updating votes");
                        }
                    }
                    catch (Exception ex)
                    {
                        log.Trace(new TraceEvent(System.Diagnostics.TraceLevel.Error, ex.Message));
                    }
                    

                }
                
            }

            return req.CreateResponse(HttpStatusCode.OK, "Stats updated.");
        }
    }
}
