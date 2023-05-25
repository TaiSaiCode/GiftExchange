using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using GiftExchangeServer.Data.DTO;
using Microsoft.CodeAnalysis.VisualBasic.Syntax;

namespace GiftExchange.Data.Entities
{
    public class User 
    {
        [Key]
        public int Id { get; set; }
        public string Username { get; set; }    
        public string Firstname { get; set; }
        public string Lastname { get; set; }

        public string Email { get; set; }
        public string Password { get; set; }

        public bool IsSuperAdmin { get; set; }

		public virtual IEnumerable<GroupUser>? GroupUsers { get; set; }
		public virtual IEnumerable<GroupUser>? DrawnGroupUsers { get; set; }


		[NotMapped]
		public string Token { get; set; }

		public override bool Equals(object? obj)
		{

			if (ReferenceEquals(obj, null))
			{
				if(ReferenceEquals(this, null)) { return true; }
				return false;
			}
			if (obj.GetType() != GetType()) return false;

			User userToCheck = obj as User;

			if (userToCheck.Id != Id) return false;
			if (userToCheck.Username != Username) return false;
			if (userToCheck.Firstname != Firstname) return false;
			if (userToCheck.Lastname != Lastname) return false;
			if (userToCheck.Email != Email) return false;
			if (userToCheck.Password != Password) return false;
			return true;
		}
		public static bool operator ==(User left, User right) {
			return Equals(left, right); 
		}
		public static bool operator !=(User left, User right) { return !Equals(left, right); }

		
		
	}
}
