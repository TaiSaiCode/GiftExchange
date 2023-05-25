using GiftExchange.Data.Entities;

namespace GiftExchangeServer.Data.DTO
{
	public class UserGroupInfo
	{
		public UserGroupInfo() { }
		public UserGroupInfo(User user)
		{
			Firstname = user.Firstname;
			Lastname = user.Lastname;
			Email = user.Email;
		}
		public string Firstname { get; set; }
		public string Lastname { get; set; }
		public string Email { get; set; }
	}
}
