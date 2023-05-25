using GiftExchange.Data.Entities;

namespace GiftExchangeServer.Data.Entities
{
	public class PendingInvitation
	{
		public int IdGroup { get; set; }
		public string Email { get; set; }

		public virtual Group? Group { get; set; }
	}
}
