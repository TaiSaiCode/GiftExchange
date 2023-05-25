using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GiftExchange.Data;
using GiftExchange.Data.Entities;
using GiftExchangeServer.Exceptions;
using GiftExchangeServer.JWTUtils;
using System.Text.RegularExpressions;
using System.ComponentModel.DataAnnotations.Schema;

namespace GiftExchangeServer.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class GiftsController : ControllerBase
	{
		private readonly GiftExchangeDbContext _context;
		private JwtUtils _authManager;

		private IConfiguration _config;
		public GiftsController(GiftExchangeDbContext context, IConfiguration config)
		{
			_config = config;
			_context = context;
			_authManager = new JwtUtils(context, config);
		}

		// GET: api/Gifts
		[HttpGet]
		[Route("/gifts")]
		public async Task<ActionResult<IEnumerable<Gift>>> GetGifts(int groupId)
		{
			User tokenUser;
			try { tokenUser = _authManager.AuthorizeWithJWT(HttpContext); }
			catch (InvalidTokenException ex) { return Unauthorized(ex.Message); }

			var listOfGifts = _context.Gifts.Where((x) => x.IdUser == tokenUser.Id && x.IdGroup == groupId).ToList();
			return Ok(listOfGifts);
		}


		// PUT: api/Gifts/5
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPut]
		[Route("/gifts/{giftId}")]
		public async Task<IActionResult> PutGift([FromBody] Data.DTO.GiftInfo gift, int giftId)
		{

			User tokenUser;
			try { tokenUser = _authManager.AuthorizeWithJWT(HttpContext); }
			catch (InvalidTokenException ex) { return Unauthorized(ex.Message); }

			Gift? updatedGift = await _context.Gifts.Where((x) => x.IdUser == tokenUser.Id && x.IdGroup == gift.IdGroup && x.Id == giftId).FirstOrDefaultAsync();
			if (updatedGift is null)
			{
				return BadRequest("Cadeau non trouvé...");
			}

			//update the properties of the updated gift:
			updatedGift.Name = gift.Name;
			updatedGift.Description = gift.Description;
			updatedGift.Price = gift.Price;
			updatedGift.Url = gift.Url;
			updatedGift.Image = gift.Image;
			updatedGift.Priority = gift.Priority;
			updatedGift.IdGroup = gift.IdGroup;

			int result = await _context.SaveChangesAsync();
			if (result == 0)
			{
				return BadRequest("Impossible de mettre a jour le cadeau...");
			}
			return Ok("Le cadeau a bien été mis-à-jour!");
		}

		// POST: api/Gifts
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754

		[HttpPost]
		[Route("/gifts")]
		public async Task<ActionResult<Gift>> PostGift([FromBody] Data.DTO.GiftInfo gift)
		{
			User tokenUser;
			try { tokenUser = _authManager.AuthorizeWithJWT(HttpContext); }
			catch (InvalidTokenException ex) { return Unauthorized(ex.Message); }

			if (!GroupUserExists(gift.IdGroup, tokenUser.Id)) return NotFound("The group or user are not associated");

			if (_context.Gifts == null)
			{
				return Problem("Entity set 'GiftExchangeDbContext.Gifts'  is null.");
			}
			Gift theGift = new Gift()
			{
				Name = gift.Name,
				Description = gift.Description,
				Price = gift.Price,
				Url = gift.Url,
				Image = gift.Image,
				Priority = 1,
				IdUser = tokenUser.Id,
				IdGroup = gift.IdGroup

			};

			_context.Gifts.Add(theGift);
			int result = await _context.SaveChangesAsync();
			if (result == 0)
			{
				return Problem("La requête n'a pas été effecuée!");
			}
			return Ok("Le cadeau a bien été ajouté!");

		}


		[HttpDelete]
		public async Task<IActionResult> DeleteGift(int groupId, int giftId)
		{
			User tokenUser;
			try { tokenUser = _authManager.AuthorizeWithJWT(HttpContext); }
			catch (InvalidTokenException ex) { return Unauthorized(ex.Message); }


			if (!GroupUserExists(groupId, tokenUser.Id)) return NotFound("The group or user are not associated");
			//TODO: verfity that the gift belongs to the correct user and group

			if (_context.Gifts == null)
			{
				return NotFound();
			}

			var gift = await _context.Gifts.Where((x) => x.Id == giftId && x.IdUser == tokenUser.Id && x.IdGroup == groupId).FirstOrDefaultAsync();
			if (gift == null)
			{
				return NotFound();
			}

			_context.Gifts.Remove(gift);


			int result = await _context.SaveChangesAsync();
			if (result == 0) return Problem("Delete wasnt executed");

			return NoContent();
		}
		[ApiExplorerSettings(IgnoreApi = true)]
		private bool GiftExists(int id)
		{
			return (_context.Gifts?.Any(e => e.Id == id)).GetValueOrDefault();
		}
		[ApiExplorerSettings(IgnoreApi = true)]
		public bool GroupUserExists(int groupId, int idUser)
		{
			return _context.GroupUsers.Any(gu => gu.IdGroup == groupId && gu.IdUser == idUser);
		}
	}
}
