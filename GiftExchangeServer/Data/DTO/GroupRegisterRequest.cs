namespace GiftExchangeServer.Data.DTO
{
    public class GroupRegisterRequest
    {
        public string Name { get; set; }
        public string? Description { get; set; }
        public string? DrawDate { get; set; }
        public string? EventDate { get; set; }
        public int?  Budget { get; set; }
        public string? Image { get; set; }
    }
}
