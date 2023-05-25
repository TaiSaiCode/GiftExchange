namespace GiftExchangeServer.Exceptions
{
	public class InvalidTokenException: Exception
	{
		public InvalidTokenException(): base("The token passed is invalid") { }
	}
}
