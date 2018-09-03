using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using Newtonsoft.Json;
using WhoIsPlaying.Common;

namespace WhoIsPlaying
{
    public static class CreateGame
    {
        [FunctionName("createGame")]
        public static async Task<HttpResponseMessage> Run([HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)]HttpRequestMessage req, TraceWriter log, [Queue("EmailQueue")] IAsyncCollector<EmailDetails> emailsQueue,
         [Table("game")] IAsyncCollector<EventTableEntity> eventsTable)
        {
            var responses = new List<Response>();
            var eventId = Guid.NewGuid().ToString("n");
            var details = await req.Content.ReadAsAsync<EventDetails>();
            foreach (var invitee in details.Invitees)
            {
                var accessCode = Guid.NewGuid().ToString("n");
                var emailDetail = new EmailDetails
                {
                    Name = invitee.Name,
                    Email = invitee.Email,
                    Location = details.Location,
                    EventDateAndTime = details.EventDateAndTime,
                    ResponseUrl = $"https://whoisplayingfuncs.azurewebsites.net/api/CreatingEvent?code=hPZSUjtzwXOZcad88K6t0m/1StfBPqYi5ZkVdYZea2IoFkqYUCWywA==&accessCode={accessCode}&event={eventId}"
                };
                log.Info($"Inviting {invitee.Name} ({invitee.Email})");
                await emailsQueue.AddAsync(emailDetail);
                responses.Add(new Response()
                {
                    Name = invitee.Name,
                    Email = invitee.Email,
                    IsPlaying = "unkown",
                    ResponseCode = accessCode
                });
            }
            await eventsTable.AddAsync(new EventTableEntity()
            {
                PartitionKey = "event",
                RowKey = eventId,
                EventDateAndTime = details.EventDateAndTime,
                Location = details.Location,
                ResponsesJson = JsonConvert.SerializeObject(responses)
            });
            return req.CreateResponse(HttpStatusCode.Created);
        }
    }
}

