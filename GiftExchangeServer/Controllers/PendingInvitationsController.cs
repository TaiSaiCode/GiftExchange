using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using GiftExchange.Data;
using GiftExchangeServer.Data.Entities;
using GiftExchangeServer.JWTUtils;
using GiftExchange.Data.Entities;
using GiftExchangeServer.Data.DTO;
using GiftExchangeServer.Exceptions;
using GiftExchangeServer.Utils;

namespace GiftExchangeServer.Controllers
{
	public class PendingInvitationsController : Controller
	{
		private readonly GiftExchangeDbContext _context;
		private IConfiguration _config;
		private JwtUtils _authManager;

		public PendingInvitationsController(GiftExchangeDbContext context, IConfiguration config)
		{
			_context = context;
			_config = config;
			_authManager = new JwtUtils(_context, _config);
		}
		[HttpGet]
		[Route("/nbInvite")]
		public async Task<ActionResult<int>> getNbInvite()
		{
			User tokenUser;
			try { tokenUser = _authManager.AuthorizeWithJWT(HttpContext); }
			catch (InvalidTokenException ex) { return Unauthorized(ex.Message); }

			return Ok(_context.PendingInvitation.Where(x=>x.Email == tokenUser.Email).Count());
		}

		[HttpGet]
		[Route("/listInvite")]
		public async Task<ActionResult<List<GroupManagement>>> getListInvitation()
		{
			User tokenUser;
			try { tokenUser = _authManager.AuthorizeWithJWT(HttpContext); }
			catch (InvalidTokenException ex) { return Unauthorized(ex.Message); }

			List<Group> groups = _context.Groups.Include(x => x.PendingInvitations).Include(x => x.GroupUsers).ThenInclude(x => x.User).Where(x => x.PendingInvitations.Any(x => x.Email == tokenUser.Email)).ToList();
			if (groups.Count == 0) { return NotFound("La liste de groupe est vide"); }

			List<GroupManagement> groupsDTO = new List<GroupManagement>();
			foreach (Group group in groups)
			{
				groupsDTO.Add(new GroupManagement(group, false, false));
			}

			return Ok(groupsDTO);

		}

        [HttpPost]
        [Route("/pendingstatus/{groupId}/{status}")]
        public async Task<IActionResult> handleInvite(int groupId, bool status)
        {
            User tokenUser;
            try { tokenUser = _authManager.AuthorizeWithJWT(HttpContext); }
            catch (InvalidTokenException ex) { return Unauthorized(ex.Message); }

            PendingInvitation? inv = await _context.PendingInvitation.Where(x => x.IdGroup == groupId && x.Email == tokenUser.Email).FirstOrDefaultAsync();

            if (inv is null) { return NotFound("L'invitation n'existe pas"); }

			if (status) {
			GroupUser groupUserToAdd = new GroupUser();
            groupUserToAdd.IdGroup = groupId;
            groupUserToAdd.IdUser = tokenUser.Id;

            _context.Add(groupUserToAdd); 
			}

			_context.Remove(inv);

            int result = await _context.SaveChangesAsync();

			if (result == 0) return Problem("Aucun changement n'a été éffectué");

            return Ok(status?"L'ajout au groupe a été faite!":"Vous avez refusé l'invitation!");

			
        }


		[ApiExplorerSettings(IgnoreApi = true)]
		public bool GroupUserExists(int groupId, int idUser)
		{
			return _context.GroupUsers.Any(gu => gu.IdGroup == groupId && gu.IdUser == idUser);
		}
	}
}
