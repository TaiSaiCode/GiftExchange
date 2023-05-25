using GiftExchangeServer.Data.DTO;
using GiftExchangeServer.Data.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GiftExchange.Data.Entities
{
    public class Group
    {
        [Key]
        public int Id { get; set; }
        public string? DrawDate { get; set; }

        public string? EventDate { get; set; }
        public string Name { get; set; }

        public string? Description { get; set; }

        public string? ImageUrl { get; set; }

        public int? Budget { get; set; }

        public bool HasBeenDrawn {  get; set; }
        public virtual IList<GroupUser>? GroupUsers { get; set; }
        public virtual IList<PendingInvitation>? PendingInvitations { get; set;}
    }
}
