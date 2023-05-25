using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Xml.Linq;

namespace GiftExchange.Data.Entities;

public class Gift
{
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        public string Description { get; set; }
        public string Price { get; set; }
        public int Priority { get; set; }
        public string Image { get; set; }
        public string Url { get; set; }
        public int IdGroup { get; set; }
        public int IdUser { get; set; }
        [ForeignKey("IdGroup, IdUser")]
        public virtual GroupUser GroupUser { get; set; }
}