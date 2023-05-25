using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GiftExchangeServer.Data.DTO
{

	public class NewOldPassword 
	{
		public string OldPassword { get; set; }
		public string NewPassword { get; set; }
	}
}
