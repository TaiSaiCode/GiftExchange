using GiftExchange.Data.Entities;

namespace GiftExchangeServer.Data.DTO
{
	public class GroupMember
	{

		public GroupMember() { }
		public GroupMember(User user, bool IsAdmin, bool IsSuperAdmin)
		{
			Id = user.Id;
			Username = user.Username;
			Firstname = user.Firstname;
			Lastname = user.Lastname;
			Email = user.Email;
			this.IsAdmin = IsAdmin;
			this.IsSuperAdmin = IsSuperAdmin;
		}
		public int Id { get; set; }	
		public string Username { get; set; }
		public string Firstname { get; set; }
		public string Lastname { get; set; }
		public bool IsAdmin { get; set; }
		public bool IsSuperAdmin { get; set; }
		public string Email { get; set; }
		public string? Token { get; set; }
	}
}
