using GiftExchange.Data.Entities;
using Microsoft.Build.Construction;

namespace GiftExchangeServer.Data.DTO
{
    public class GroupManagement
    {
        public GroupManagement(Group group, bool isAdmin, bool isSuperAdmin) {
            if(group.Id >0 ) Id = group.Id;
            IsSuperAdmin= isSuperAdmin;
           Name= group.Name;
           Description= group.Description;
           ImageUrl= group.ImageUrl;
           Budget= group.Budget;
           Members = new List<GroupMember>();
           AdminsNames = new List<string>();
            HasBeenDrawn = group.HasBeenDrawn;
            EventDate = group.EventDate;
            DrawDate = group.DrawDate;
            IsAdmin = isAdmin;
            foreach (GroupUser groupUser in group.GroupUsers)
            {
                if (groupUser.IsAdmin) AdminsNames.Add(groupUser.User.Firstname + " " + groupUser.User.Lastname);
                Members.Add(new GroupMember(groupUser.User, groupUser.IsAdmin, groupUser.IsSuperAdmin));
            }
        }
        public int? Id { get; set; }
        public string? DrawDate { get; set; }
        public string? EventDate { get; set; }
        public string Name { get; set; }

        public string? Description { get; set; }

        public string? ImageUrl { get; set; }

        public int? Budget { get; set; }

        public bool? IsAdmin { get; set; }
		public bool? IsSuperAdmin { get; set; }


		public bool HasBeenDrawn { get; set; }
        public List<GroupMember> Members { get; set; }
        public List<string> AdminsNames { get; set; }

    }
}