using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Collections.Generic;

namespace WhoIsPlaying.Common
{
	public class EventDetails
	{
		public DateTime EventDateAndTime { get; set; }
		public string Location { get; set; }
		public List<PlayerDetails> Invitees { get; set; }
	}

	public class PlayerDetails
	{
		public string Name { get; set; }
		public string Email { get; set; }
        public double Votes { get; set; }

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
        public List<PlayerDetails> team1 { get; set; }
        public List<PlayerDetails> team2 { get; set; }
        
    }

	public class EventTableEntity: TableEntity 
	{
		public string ResponsesJson { get; set; }
		public string Location { get; set; }
		public DateTime EventDateAndTime { get; set; }
        public string teams { get; set; }

        public string votes { get; set; }
    }

   

    public class UserEntity : TableEntity
	{
		public string Name { get; set; }
		public string Email { get; set; }
        public double Votes { get; set; }

        public double VoteQuantity { get; set; }

    }

    public class Response
	{
		public string Name { get; set; }
		public string Email { get; set; }
		public string IsPlaying { get; set; }
		public string ResponseCode { get; set; }
	}
}
