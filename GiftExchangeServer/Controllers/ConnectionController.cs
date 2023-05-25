using GiftExchangeServer.JWTUtils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using System.Text.RegularExpressions;

namespace GiftExchangeServer.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ConnectionController : ControllerBase
	{
		[HttpGet]
		[Route("/")]
		public async Task<IActionResult> GetStatus()
		{
			return Ok();
		}

		[HttpGet]
		[Route("/hash")]
		public async Task<IActionResult> TestHash()
		{
			string test = "test123";

			string hashed = PasswordHasher.HashPassword(test);

			if(PasswordHasher.VerifyPassword(test, hashed))
			{
				return Ok();
			}
			return Problem();
		}
	}

}
