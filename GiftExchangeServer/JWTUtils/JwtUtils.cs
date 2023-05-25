using GiftExchange.Data;
using GiftExchange.Data.Entities;
using GiftExchangeServer.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace GiftExchangeServer.JWTUtils
{
	public class JwtUtils
	{
        private readonly GiftExchangeDbContext _context;
		private IConfiguration _config;

		public JwtUtils(GiftExchangeDbContext context, IConfiguration config) {

			this._context = context;
			this._config = config;
		}

		public User? getUserFromJwt(HttpContext HttpContext)
		{
			var token = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

			var tokenHandler = new JwtSecurityTokenHandler();
			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
			try
			{
				tokenHandler.ValidateToken(token, new TokenValidationParameters
				{
					ValidateIssuerSigningKey = true,
					IssuerSigningKey = key,
					ValidateIssuer = false,
					ValidateAudience = false,
					// set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
					ClockSkew = TimeSpan.Zero
				}, out SecurityToken validatedToken);

				var jwtToken = (JwtSecurityToken)validatedToken;
				User user = new User
				{
					Id = int.Parse(jwtToken.Claims.First(x => x.Type == ClaimTypes.Authentication).Value),
					Username = jwtToken.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value,
					Email = jwtToken.Claims.First(x => x.Type == ClaimTypes.Email).Value,
					Firstname = jwtToken.Claims.First(x => x.Type == ClaimTypes.GivenName).Value,
					Lastname = jwtToken.Claims.First(x => x.Type == ClaimTypes.Surname).Value,
					Password = jwtToken.Claims.First(x => x.Type == ClaimTypes.Sid).Value,
				};
				// return user from JWT
				return user;
			}
			catch
			{
				// return null if validation fails
				return null;
			}

		}
		public User AuthorizeWithJWT(HttpContext HttpContext)
		{
			User? userToken = getUserFromJwt(HttpContext);
			if (userToken == null) throw new InvalidTokenException();
			if (!isIdMatchingUserInfo(userToken.Id, userToken)) throw new InvalidTokenException();
			return userToken;
		}


		private bool isIdMatchingUserInfo(int id, User userInfoToVerify)
		{
			User? userInDB = _context.Users.Find(id);
			if (userInDB == null) return false;
			if (userInDB == userInfoToVerify) return true;
			else return false;
		}

	}
}
