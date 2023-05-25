using GiftExchange.Data.Entities;

namespace GiftExchangeServer.Data.DTO
{
    public class Recipient
    {
        public string? Firstname { get; set; }
        public string? Lastname { get; set; }

        public List<Gift>? Gifts { get; set; }
    }
}
