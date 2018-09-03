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
    public static class GameList
    {
        [FunctionName("gameList")]
        public static async Task<HttpResponseMessage> Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)]HttpRequestMessage req, TraceWriter log, [Table("game")] CloudTable gamesTable)
        {
            log.Info("Getting game list items");
            var query = new TableQuery<EventTableEntity>();
            var items = await gamesTable.ExecuteQuerySegmentedAsync(query, null);
            return req.CreateResponse(HttpStatusCode.OK, items.Select(game => new {
                EventDateAndTime = game.EventDateAndTime,
                Location = game.Location,
                Invitees = JsonConvert.DeserializeObject<Response[]>(game.ResponsesJson)
            }));
        }
    }
}
