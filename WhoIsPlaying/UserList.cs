using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.WindowsAzure.Storage.Table;
using WhoIsPlaying.Common;

namespace WhoIsPlaying
{
	public static class UserList
	{
		[FunctionName("userList")]
		public static async Task<HttpResponseMessage> Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route =
				null)]
			HttpRequestMessage req, TraceWriter log
			, [Table("users")] CloudTable usersTable)
		{
			log.Info($"Getting users");
			var query = new TableQuery<UserEntity>();
			var items = await usersTable.ExecuteQuerySegmentedAsync(query, null);
			return req.CreateResponse(HttpStatusCode.OK, items.Select(user => new {
				Name = user.Name,
				Email = user.Email,
                VoteQuantity = user?.VoteQuantity,
                Votes = user?.Votes
			}));
		}
	}

}