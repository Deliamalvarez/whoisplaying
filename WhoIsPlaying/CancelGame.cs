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
	public class CancelGame
	{

		[FunctionName("cancelGame")]
		public static async Task<HttpResponseMessage> Run([HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "cancelGame/{id}")]HttpRequestMessage req, 
			TraceWriter log, 
			[Queue("EmailQueue")] IAsyncCollector<EmailDetails> emailsQueue,
			[Table("game")] CloudTable gameTable, string id)
		{
			log.Info("Cancel Game.");

			TableOperation operation = TableOperation.Retrieve<EventTableEntity>("event", id);
			TableResult result = gameTable.Execute(operation);
			var game = (EventTableEntity)result.Result;
			if (game == null)
			{
				log.Warning($"Game not found {id}");
				return req.CreateResponse(HttpStatusCode.NotFound, "Game not found");
			}

			var responses = JsonConvert.DeserializeObject<Response[]>(game.ResponsesJson);

			var sb = new StringBuilder();
			sb.Append($"<p> Te confirmamos que el juego en <b>{game.Location}</b> a las <b>{game.EventDateAndTime}</b> fue cancelado.</p>");

			foreach (var r in responses)
			{
				var emailDetail = new EmailDetails
				{
					Name = r.Name,
					Email = r.Email,
					Message = sb.ToString(),
					Subject = "Partido cancelado"
				};
				await emailsQueue.AddAsync(emailDetail);
			}

			TableOperation delete = TableOperation.Delete(game);
			TableResult resultDelete = gameTable.Execute(delete);

			return req.CreateResponse(HttpStatusCode.OK, "Match canceled. An Email will be sent with details");
		}
	}
}
