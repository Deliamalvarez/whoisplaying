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
    public static class GameDetail
    {
        [FunctionName("gameDetail")]
        public static async Task<HttpResponseMessage> Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "gameDetail/{id}")]HttpRequestMessage req, TraceWriter log, [Table("game")] CloudTable gameTable,
    string id)
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
            var responses = JsonConvert.DeserializeObject<Response[]>(game.ResponsesJson);

           

            // parse query parameter
            string responseCode = req.GetQueryNameValuePairs()
                .FirstOrDefault(q => string.Compare(q.Key, "responseCode", true) == 0)
                .Value;

            return req.CreateResponse(HttpStatusCode.OK, new
            {
                EventDateAndTime = game.EventDateAndTime,
                Location = game.Location,
                Teams = getTeams(game.teams),
                Responses = responses.Select(r => new
                {
                    Name = r.Name,
                    Playing = r.IsPlaying
                })
                .ToArray()
            });
        }

        private static Teams getTeams(string teams)
        {
            return !string.IsNullOrEmpty(teams)? JsonConvert.DeserializeObject<Teams>(teams) : null;
        }
    }
}
