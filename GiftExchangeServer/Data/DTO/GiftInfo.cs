using GiftExchange.Data.Entities;

namespace GiftExchangeServer.Data.DTO
{
    public class GiftInfo
    {
        public GiftInfo() { }

        public GiftInfo(Gift gift)
        {
            Name = gift.Name;
            Description = gift.Description;
            Price = gift.Price;
            Priority = gift.Priority;
            Image = gift.Image;
            Url = gift.Url;
            IdUser = gift.IdUser;
            IdGroup = gift.IdGroup;

        }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Price { get; set; }
        public int Priority { get; set; }
        public string Url { get; set; }
        public string Image { get; set; }
        public int IdUser { get; set; }
        public int IdGroup { get; set; }

    }
}
