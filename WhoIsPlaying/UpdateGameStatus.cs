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
    public static class UpdateGameStatus
    {
        [FunctionName("updateGameInvitation")]
        public static async Task<HttpResponseMessage> Run([HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "updateGameInvitation/{id}/response/{responseCode}")]HttpRequestMessage req, TraceWriter log, [Table("game")] CloudTable eventsTable, string id, string responseCode)
        {
            log.Info($"Updating response {responseCode} for game {id}");
            TableOperation operation = TableOperation.Retrieve<EventTableEntity>("event", id);
            TableResult result = eventsTable.Execute(operation);
            var @event = (EventTableEntity)result.Result;
            if (@event == null)
            {
                log.Warning($"Game not found {id}");
                return req.CreateResponse(HttpStatusCode.NotFound, "Game not found");
            }
            log.Info("Deserializing");
            var responses = JsonConvert.DeserializeObject<Response[]>(@event.ResponsesJson);
            var responseToUpdate = responses.FirstOrDefault(r => r.ResponseCode == responseCode);
            if (responseToUpdate == null)
            {
                log.Warning($"Response not found for event {id}");
                return req.CreateResponse(HttpStatusCode.NotFound, "Response not found for game");
            }
            log.Info("Read body to update");
            dynamic response = await req.Content.ReadAsAsync<object>();
            responseToUpdate.IsPlaying = response.isPlaying;
            @event.ResponsesJson = JsonConvert.SerializeObject(responses);
            operation = TableOperation.Replace(@event);
            eventsTable.Execute(operation);
            return req.CreateResponse(HttpStatusCode.OK, "Updated sucessfully");
        }
    }
}
