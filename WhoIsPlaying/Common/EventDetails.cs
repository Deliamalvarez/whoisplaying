using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Collections.Generic;

namespace WhoIsPlaying.Common
{
	public class EventDetails
	{
		public DateTime EventDateAndTime { get; set; }
		public string Location { get; set; }
		public List<InviteeDetails> Invitees { get; set; }
	}

	public class InviteeDetails
	{
		public string Name { get; set; }
		public string Email { get; set; }
	}

	public class EmailDetails
	{
		public string Name { get; set; }
		public string Email { get; set; }
        public string Message { get; set; }

        public string Subject { get; set; }
    }


    public class Teams
    {
        public List<InviteeDetails> team1 { get; set; }
        public List<InviteeDetails> team2 { get; set; }
        
    }

	public class EventTableEntity: TableEntity 
	{
		public string ResponsesJson { get; set; }
		public string Location { get; set; }
		public DateTime EventDateAndTime { get; set; }
        public Teams teams { get; set; }
    }

   

    public class UserEntity : TableEntity
	{
		public string Name { get; set; }
		public string Email { get; set; }
	}

	public class Response
	{
		public string Name { get; set; }
		public string Email { get; set; }
		public string IsPlaying { get; set; }
		public string ResponseCode { get; set; }
	}
}
