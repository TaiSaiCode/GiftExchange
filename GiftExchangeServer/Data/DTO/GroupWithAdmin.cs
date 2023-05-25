using GiftExchange.Data.Entities;

namespace GiftExchangeServer.Data.DTO
{
	public class GroupWithAdmin
	{
		public GroupWithAdmin(Group group) {
			Id = group.Id;
			DrawDate= group.DrawDate;
			EventDate = group.EventDate;
			Name= group.Name;
			Description= group.Description;
			ImageUrl= group.ImageUrl;
			Admins = new List<UserProfilInfo>();
			foreach (GroupUser groupUser in group.GroupUsers){
				if (groupUser.IsAdmin) Admins.Add(new UserProfilInfo(groupUser.User));
			}
		}
		public int Id { get; set; }
		public string? DrawDate { get; set; }
        public string? EventDate { get; set; }
        public string Name { get; set; }

		public string? Description { get; set; }

		public string? ImageUrl { get; set; }

	
		public List<UserProfilInfo> Admins { get; set; }
	}
}
