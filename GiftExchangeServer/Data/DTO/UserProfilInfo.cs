using GiftExchange.Data.Entities;

namespace GiftExchangeServer.Data.DTO
{
	public class UserProfilInfo
	{

		public UserProfilInfo() { }
		public UserProfilInfo(User user)
		{
			Username = user.Username;
			Firstname = user.Firstname;
			Lastname = user.Lastname;
			Email = user.Email;
			
		}
		public string Username { get; set; }
		public string Firstname { get; set; }
		public string Lastname { get; set; }
		public string Email { get; set; }
		public string? Token { get; set; }
	}
}
