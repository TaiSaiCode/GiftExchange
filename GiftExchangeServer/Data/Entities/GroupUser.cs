using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GiftExchange.Data.Entities
{
    public class GroupUser
    {
        
        public int IdGroup { get; set; }
        
        public int IdUser { get; set; }

        public int? IdDrawnUser { get; set; }

        public bool IsAdmin { get; set; } = false;
        public bool IsSuperAdmin { get; set; } = false;
        public virtual Group Group { get; set; }
        public virtual User User { get; set; }
       
        public virtual User DrawnUser { get; set; }

        public virtual IList<Gift> Gifts { get; set; }
	}
}
