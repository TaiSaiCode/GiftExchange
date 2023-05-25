using GiftExchange.Data;
using GiftExchange.Data.Entities;
using GiftExchangeServer.Data.DTO;
using GiftExchangeServer.Data.Entities;
using GiftExchangeServer.Exceptions;
using GiftExchangeServer.JWTUtils;
using GiftExchangeServer.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.Drawing.Drawing2D;
using System.Threading.Tasks.Dataflow;

namespace GiftExchangeServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupsController : ControllerBase
    {
        private readonly GiftExchangeDbContext _context;
        private IConfiguration _config;
        private JwtUtils _authManager;

        public GroupsController(GiftExchangeDbContext context, IConfiguration config)
        {
            _config = config;
            _context = context;
            _authManager = new JwtUtils(context, config);
        }



        [HttpPut]
        [Route("/toggleAdmin/{groupId}/{userId}")]
		public async Task<IActionResult> ToggleAdmin(int groupId, int userId)
        {
			User user;
			try { user = _authManager.AuthorizeWithJWT(HttpContext); }
			catch (InvalidTokenException ex) { return Unauthorized(ex.Message); }
            bool isAdmin = _context.GroupUsers.Where(x=> x.IdGroup== groupId && x.IdUser == user.Id && x.IsAdmin).Any();
            if (!isAdmin) return BadRequest("Vous n'est pas administrateur");

            GroupUser? groupUser = _context.GroupUsers.Where(x => x.IdGroup == groupId && x.IdUser == userId).FirstOrDefault();
            if (groupUser is null) return BadRequest("L'utilisateur n'exsite pas!");
            if (groupUser.IsSuperAdmin) return BadRequest("Vous ne pouvez pas modifier le createur !");

            groupUser.IsAdmin = !groupUser.IsAdmin;

            int result =await  _context.SaveChangesAsync();
            if (result == 0) return Problem("Oopss... une erreur est surevenu");
            return Ok();

        }



        [HttpPost]
        [Route("/createGroup")]
        public async Task<ActionResult<int>> PostCreateGroup(GroupRegisterRequest group)
        {
            User user;
            try { user = _authManager.AuthorizeWithJWT(HttpContext); }
            catch (InvalidTokenException ex) { return Unauthorized(ex.Message); }

            if (group == null) return BadRequest("La requetes n'a pas bien été demandé");

            if (group.Name.IsNullOrEmpty() || !Validation.IsName(group.Name)) return BadRequest("Le nom du groupe ne peut pas être vide ou de format incorrect");
			if (!group.Image.IsNullOrEmpty() && !Validation.IsUrl(group.Image)) return BadRequest("Mauvais lien pour l'image.");


			//Shitty date checker
			try
			{
				long? tickEventDate = null;
				long? tickDrawDate = null;
				if (group.EventDate is not null)
				{
					var eventDateSplitted = group.EventDate.Split("-");
					tickEventDate = new DateTime(int.Parse(eventDateSplitted[0]), int.Parse(eventDateSplitted[1]), int.Parse(eventDateSplitted[2])).Ticks;
					if (tickEventDate - DateTime.Now.Ticks < 0) return BadRequest("La date de l'evenement ne peut être avant aujourd'hui");

				}
				if (group.DrawDate is not null)
				{
					var drawDateSplitted = group.DrawDate.Split("-");
					tickDrawDate = new DateTime(int.Parse(drawDateSplitted[0]), int.Parse(drawDateSplitted[1]), int.Parse(drawDateSplitted[2])).Ticks;
					if (tickDrawDate - DateTime.Now.Ticks < 0) return BadRequest("La date de l'evenement ne peut être avant aujourd'hui");
				}
				if (tickDrawDate is not null && tickEventDate is not null && (tickDrawDate - tickEventDate) > 0) return BadRequest("La date de pige ne peut être apres la date de l'event");
			}
			catch (Exception ex) { return BadRequest("Format de date non valide."); }


			if (group.Budget is not null && (group.Budget < 0 || group.Budget > 500)) return BadRequest("Le budget doit être en 0 et 500");


            Group groupToAdd = new Group()
            {
                Name = group.Name,
                Description = group.Description,
                DrawDate = group.DrawDate,
                EventDate = group.EventDate,
                Budget = group.Budget,
                ImageUrl = group.Image,

            };
            _context.Groups.Add(groupToAdd);


            int result = await _context.SaveChangesAsync();

            if (result == 0)
                return BadRequest("Un problème est survenu, aucun groupe n'a été ajouté a la base de donnée");


            GroupUser groupUserAdmin = new GroupUser()
            {
                IdGroup = groupToAdd.Id,
                IdUser = user.Id,
                IsAdmin = true,
                IsSuperAdmin= true,
            };


            _context.GroupUsers.Add(groupUserAdmin);

            int resultGroupUser = await _context.SaveChangesAsync();

            if (resultGroupUser == 0)
                return BadRequest("Un problème est survenu, aucun groupe n'a été ajouté a la base de donnée");

            return Ok(groupToAdd.Id);
        }

        [HttpGet]
        [Route("/get-groups")]
        public async Task<ActionResult<ICollection<GroupWithAdmin>>> GetGroups()
        {
            User user;
            try { user = _authManager.AuthorizeWithJWT(HttpContext); }
            catch (InvalidTokenException ex) { return Unauthorized(ex.Message); }

            List<Group> groups = _context.Groups.Include(g => g.GroupUsers).ThenInclude(gu => gu.User).Where(g => g.GroupUsers.Any(gu => gu.IdUser == user.Id)).ToList();
            List<GroupWithAdmin> groupsWithAdmins = new List<GroupWithAdmin>();
            foreach (Group group in groups)
            {
                groupsWithAdmins.Add(new GroupWithAdmin(group));
            }

            return Ok(groupsWithAdmins);
        }
        [HttpGet]
        [Route("/group")]
        public async Task<ActionResult<GroupManagement>> GetGroups(int groupId)
        {
            User tokenUser;
            try { tokenUser = _authManager.AuthorizeWithJWT(HttpContext); }
            catch (InvalidTokenException ex) { return Unauthorized(ex.Message); }


            bool IsAdmin = _context.GroupUsers.Any(gu => gu.IdUser == tokenUser.Id && gu.IdGroup == groupId && gu.IsAdmin == true);
			bool IsSuperAdmin = _context.GroupUsers.Any(gu => gu.IdUser == tokenUser.Id && gu.IdGroup == groupId && gu.IsSuperAdmin == true);

			Group? group = await _context.Groups.Where((x) => x.Id == groupId).Include(gu => gu.GroupUsers).ThenInclude(u => u.User).Where(x=> x.GroupUsers.Any(x=>x.IdUser == tokenUser.Id)).FirstOrDefaultAsync();

            if (group == null)
            {
                return NotFound("Groupe introuvable ou innaccessible a l'utilisateur.");

            }

            GroupManagement groupDTO = new GroupManagement(group, IsAdmin, IsSuperAdmin);

        
            return Ok(groupDTO);
        }


        [ApiExplorerSettings(IgnoreApi = true)]
        public bool GroupUserExists(int groupId, int idUser)
        {
            return _context.GroupUsers.Any(gu => gu.IdGroup == groupId && gu.IdUser == idUser);
        }

        [HttpPut]
        [Route("/group")]
        public async Task<ActionResult<Group>> EditGroup(Group inputGroup)
        {
            User tokenUser;
            try { tokenUser = _authManager.AuthorizeWithJWT(HttpContext); }
            catch (InvalidTokenException ex) { return Unauthorized(ex.Message); }

            if (!Validation.IsName(inputGroup.Name)) return BadRequest("Le nom du groupe n'est pas valide");
			if (inputGroup is not null &&( inputGroup.Budget < 0 || inputGroup.Budget > 500)) return BadRequest("Le budget doit être en 0 et 500");
			if (!inputGroup.ImageUrl.IsNullOrEmpty() && !Validation.IsUrl(inputGroup.ImageUrl)) return BadRequest("Mauvais lien pour l'image.");


			//Shitty date checker
			try
			{
				
                long? tickEventDate = null;
                long? tickDrawDate = null;
                if (inputGroup.EventDate is not null) {
					var eventDateSplitted = inputGroup.EventDate.Split("-");
					tickEventDate = new DateTime(int.Parse(eventDateSplitted[0]), int.Parse(eventDateSplitted[1]), int.Parse(eventDateSplitted[2])).Ticks;
                    if(tickEventDate - DateTime.Now.Ticks < 0) return BadRequest("La date de l'evenement ne peut être avant aujourd'hui");

				}
				if (inputGroup.DrawDate is not null)
				{
					var drawDateSplitted = inputGroup.DrawDate.Split("-");
					tickDrawDate = new DateTime(int.Parse(drawDateSplitted[0]), int.Parse(drawDateSplitted[1]), int.Parse(drawDateSplitted[2])).Ticks;
					if (tickDrawDate - DateTime.Now.Ticks < 0) return BadRequest("La date de l'evenement ne peut être avant aujourd'hui");
				}
                if(tickDrawDate is not null && tickEventDate is not null && (tickDrawDate - tickEventDate) > 0) return BadRequest("La date de pige ne peut être apres la date de l'event");
			}
			catch (Exception ex) { return BadRequest("Format de date non valide."); }

			bool isAdminOfGroup = _context.GroupUsers.Where(x=> x.IdGroup == inputGroup.Id && x.IdUser == tokenUser.Id && x.IsAdmin).Any();
            if (!isAdminOfGroup) return Problem("Vous ne faites pas partis des admins de ce groupe!");

            Group? group = await _context.Groups.Where((x) => x.Id == inputGroup.Id).FirstOrDefaultAsync();
            if (group == null)
            {
                return NotFound("Groupe introuvable");
            }
            group.Name = inputGroup.Name;
            group.Description = inputGroup.Description;
            group.DrawDate = inputGroup.DrawDate;
            group.EventDate = inputGroup.EventDate;
            group.ImageUrl = inputGroup.ImageUrl;
            group.Budget = inputGroup.Budget;
            await _context.SaveChangesAsync();

            return Ok(group);
        }
        [HttpDelete]
        [Route("/group/{groupId}")]
        public async Task<IActionResult> DeleteGroup(int groupId)
        {
			User tokenUser;
			try { tokenUser = _authManager.AuthorizeWithJWT(HttpContext); }
			catch (InvalidTokenException ex) { return Unauthorized(ex.Message); }

            bool isSuperAdmin = _context.GroupUsers.Where(x=> x.IdGroup == groupId && x.IdUser == tokenUser.Id && x.IsSuperAdmin).Any();
            if (!isSuperAdmin) return BadRequest("Vous n'etes pas admin");

            Group? group = _context.Groups.Where(x=>x.Id == groupId).Include(x=> x.GroupUsers).FirstOrDefault();
            if (group is null) return NotFound("Group introuvable");

            _context.Remove(group);
            int result = await _context.SaveChangesAsync();
            if (result == 0) return Problem("Oops... un problème est survenu");

			return Ok();
        }

        [HttpPost]
        [Route("/group")]
        public async Task<ActionResult<GroupManagement>> sendInvite(int groupId, UserInvite info)
        {
            User tokenUser;
            try { tokenUser = _authManager.AuthorizeWithJWT(HttpContext); }
            catch (InvalidTokenException ex) { return Unauthorized(ex.Message); }

			GroupUser? groupUser = _context.GroupUsers.Where(x => x.IdGroup == groupId && x.IdUser == tokenUser.Id && x.IsAdmin).Include(x=> x.Group).FirstOrDefault();
			if (groupUser is null) return Problem("Vous ne faites pas partis des admins de ce groupe!");


            //fill PendingInvitation table if no user has already been invited
            if (await _context.PendingInvitation.AnyAsync(pi => pi.IdGroup == groupId && pi.Email == info.Email))
            {
                //there is already a pending invite for this email in that group
                return BadRequest("Cette personne a déjà été invitée à ce groupe");
            }
            if (_context.Users.Any(u => u.Email == info.Email))
            {
                //user exists in the database: generate a link for login with groupId
                string inviteLink = $"http://localhost:5173/login";

                string message = "Bonjour " + info.Firstname + " " + info.Lastname + ",<br/>Vous avec reçu une invitation de la part de " + tokenUser.Firstname + " " + tokenUser.Lastname + " (" + tokenUser.Email + ") afin de participer à un échange de cadeau." +
                    "<br/> Si vous voulez rejoindre le groupe " + groupUser.Group.Name + ", veuillez <a href=" + inviteLink + ">cliquer ici</a>.";
                Email.SendEmail(info, "invitation Gift exchange", message);

            }
            else
            {
                //user doesn't exist in the database: with pendingNewUser link (hashed string generated from the user email, fname, and lname 
                string inviteLink = $"http://localhost:5173/register?email={info.Email}&firstname={info.Firstname}&lastname={info.Lastname}";

                string message = "Bonjour " + info.Firstname + " " + info.Lastname + ",<br/>Vous avec reçu une invitation de la part de " + tokenUser.Firstname + " " + tokenUser.Lastname + " (" + tokenUser.Email + ") afin de participer à un échange de cadeau." +
                    "<br/> Si vous voulez rejoindre le groupe " + groupUser.Group.Name + ", veuillez <a href=" + inviteLink + ">cliquer ici</a> pour créer votre compte.";
                Email.SendEmail(info, "invitation Gift exchange", message);

            }
            //ajouter au pending invite
            _context.PendingInvitation.Add(new PendingInvitation() { IdGroup = groupId, Email = info.Email });

            await _context.SaveChangesAsync();

            return Ok("invite sent");
        }


        [HttpGet]
        [Route("/recipient")]
        public async Task<ActionResult<Recipient>> getRecipient(int groupId)
        {
            User tokenUser;
            try { tokenUser = _authManager.AuthorizeWithJWT(HttpContext); }
            catch (InvalidTokenException ex) { return Unauthorized(ex.Message); }


            GroupUser? groupUser = await _context.GroupUsers.Where((x) => x.IdGroup == groupId && x.IdUser == tokenUser.Id && x.IdDrawnUser != null).Include(x=> x.DrawnUser).ThenInclude(x=> x.GroupUsers.Where(x=> x.IdGroup == groupId)).ThenInclude(x=> x.Gifts).FirstOrDefaultAsync();
            if (groupUser is null)
            {
                return NotFound("Ce groupe n'existe pas pour l'utilisateur ou la pige n'a pas été encore exécuté.");
            }
            if (groupUser.DrawnUser.GroupUsers is null) return NotFound("DrawnUser not found.");

            return Ok(new Recipient { Firstname = groupUser.DrawnUser.Firstname, Lastname = groupUser.DrawnUser.Lastname, Gifts = groupUser.DrawnUser.GroupUsers.FirstOrDefault().Gifts.ToList() });
        }


        [HttpGet]
        [Route("/getusers")]
        public async Task<ActionResult<List<GroupUser>>> getUsersIds(int groupId)
        {
            User tokenUser;
            try { tokenUser = _authManager.AuthorizeWithJWT(HttpContext); }
            catch (InvalidTokenException ex) { return Unauthorized(ex.Message); }
            List<GroupUser> list = await _context.GroupUsers.Where((x) => x.IdGroup == groupId).ToListAsync();
            if (list is null) return NotFound("Ce groupe n'existe pas ou ses utilisateurs ne sont pas accessibles!");
            return Ok(list);

        }
        [HttpPut]
        [Route("/tempmatch")]
        public async Task<ActionResult<List<List<int>>>> tempMatches(int groupId, List<List<int>> pairs)
        {

            User tokenUser;
            try { tokenUser = _authManager.AuthorizeWithJWT(HttpContext); }
            catch (InvalidTokenException ex) { return Unauthorized(ex.Message); }
            Group? group = await _context.Groups.Where((g) => g.Id == groupId).FirstOrDefaultAsync();
            if (group is null) return NotFound("Groupe introuvable");

            group.HasBeenDrawn = true;
            foreach (List<int> pair in pairs)
            {
                GroupUser? giver = await _context.GroupUsers.Where((x) => x.IdGroup == groupId && x.IdUser == pair[0]).FirstOrDefaultAsync();
                GroupUser? receiver = await _context.GroupUsers.Where((x) => x.IdGroup == groupId && x.IdUser == pair[1]).FirstOrDefaultAsync();
                if (giver != null && receiver != null)
                {
                    giver.IdDrawnUser = receiver.IdUser;

                }

            }
            await _context.SaveChangesAsync();

            return Ok(pairs);
        }

        /*        [HttpPut]
                [Route("/matches")]
                public async Task<ActionResult<List<int[]>>> shuffleMatches(int groupId)
                {

                    User tokenUser;
                    try { tokenUser = _authManager.AuthorizeWithJWT(HttpContext); }
                    catch (InvalidTokenException ex) { return Unauthorized(ex.Message); }

                    Group? group = await _context.Groups.Where(g => g.Id == groupId).Include(g => g.GroupUsers).Where(x => x.GroupUsers.Any(x => x.IdUser == tokenUser.Id && x.IsAdmin)).FirstOrDefaultAsync();//all group users from the group
                    if (group is null) return NotFound("Groupe inexistant ou non admin.");


                    if (group.GroupUsers is null && group.GroupUsers.Count < 3) return BadRequest("Not enough person in the group to execute the draw.");


                    List<GroupUser> remainings = group.GroupUsers.ToList();
                    List<GroupUser[]> pairs = new List<GroupUser[]>();
                    int total = group.GroupUsers.Count;

                    for (int i = 0; i < total; i++)
                    {
                        GroupUser giver = group.GroupUsers[i];//TO VERIF
                        GroupUser receiver = Matching.getRandomReceiver(remainings, giver);
                        if (receiver == null)
                        {
                            int index = new Random().Next(total - 1);
                            receiver = pairs[index][1];
                            pairs[index][1] = giver;
                        }
                        pairs.Add(new GroupUser[] { giver, receiver });
                        if (i < total - 1) remainings = Matching.copyOfArrayWithout(remainings, remainings.IndexOf(receiver));
                        //if (i < total - 1) remainings.Remove(receiver);
                    }

                    ///FROM HERE, THE MATCHES ARE MADE. WE NEED TO GIVE EACH ONE THEIR CHOUCHOU
                    List<int[]> result = new List<int[]>();
                    foreach (GroupUser[] pair in pairs)
                    {
                        GroupUser? giver = await _context.GroupUsers.Where(x => x.IdGroup == groupId && x.IdUser == pair[0].IdUser).FirstOrDefaultAsync();
                        if (giver != null)
                        {

                            giver.IdDrawnUser = pair[1].IdUser;
                            result.Add(new int[] { giver.IdUser, pair[1].IdUser });
                        }

                    }
                    try
                    {
                        await _context.SaveChangesAsync();
                    }
                    catch (Exception ex) { return Problem(ex.Message); }
                    return Ok(result);
                }*/

        [HttpPut]
        [Route("/matches")]
        public async Task<ActionResult<List<int[]>>> shuffleMatches(int groupId)
        {

            User tokenUser;
            try { tokenUser = _authManager.AuthorizeWithJWT(HttpContext); }
            catch (InvalidTokenException ex) { return Unauthorized(ex.Message); }

            Group? group = await _context.Groups.Where(g => g.Id == groupId).Include(g => g.GroupUsers).Where(x => x.GroupUsers.Any(x => x.IdUser == tokenUser.Id && x.IsAdmin)).FirstOrDefaultAsync();//all group users from the group
            if (group is null) return NotFound("Groupe inexistant ou utilisateur non admin.");
            if (group.HasBeenDrawn) return BadRequest("La pige a déjà été éffectué!");

            if (group.GroupUsers is null || group.GroupUsers.Count < 3) return BadRequest("Il n'y a pas assez de personne dans le groupe pour effectuer la pige.");


            //Get a list of ids
            var groupUsers = group.GroupUsers;
            List<int> ids = (from gu in groupUsers select gu.IdUser).ToList();

            //get a shuffled list no self reference using Fisher-Yates algo and moving by one place if needed (O(N3) since we got 3 for loops here)
            List<int> partners = Matching.ShuffleUsers(ids);

            for (int i = 0; i < groupUsers.Count; i++)
            {
                groupUsers[i].IdDrawnUser = partners[i];
            }


            group.HasBeenDrawn = true;
            group.DrawDate = DateTime.Now.ToShortDateString();

            int result = await _context.SaveChangesAsync();

            if (result == 0) return Problem("La pige n'a pas été effectué");
            return Ok("La pige a bien été exécuté");

        }


        [HttpDelete]
        [Route("/quitGroupe/{groupId}")]
        public async Task<IActionResult> QuitGroupe(int groupId)
        {
			User tokenUser;
			try { tokenUser = _authManager.AuthorizeWithJWT(HttpContext); }
			catch (InvalidTokenException ex) { return Unauthorized(ex.Message); }

            var groupUser = _context.GroupUsers.Where(x=>x.IdGroup== groupId && x.IdUser== tokenUser.Id).FirstOrDefault();
			Group? group = _context.Groups.Include(x => x.GroupUsers).Where(x => x.Id == groupId).FirstOrDefault();


			if (groupUser is null) { return NotFound("Vous ne faites pas partis de se groupe"); }

            if (groupUser.IsSuperAdmin) return BadRequest("Vous ne pouvez pas quitter le groupe. (Createur)");
            if (groupUser.IsAdmin && group.GroupUsers.Where(x => x.IsAdmin).Count()  < 2 && group.GroupUsers.Count() > 1)
            {
                return BadRequest("Vous ne pouvez pas quitter ce groupe si vous ne nommez pas d'autre admin");
            }

            //Reset draw if someone quit
            if (group.HasBeenDrawn)
			{
				group.HasBeenDrawn = false;
				group.DrawDate = null;
				foreach (GroupUser gu in group.GroupUsers)
				{
					gu.IdDrawnUser = null;
				}
			}

			_context.GroupUsers.Remove(groupUser);
            group.GroupUsers.Remove(groupUser);
			if (group.GroupUsers == null || group.GroupUsers.Count < 1)
			{
				_context.Groups.Remove(group);
			}
			int result = await _context.SaveChangesAsync();

            if(result == 0 ) { return NotFound("No action were made"); }

            return Ok("L'utilisateur a bel et bien quitté le groupe.");

		}
        [HttpDelete]
        [Route("/deleteMember/{groupId}/{memberId}")]
        public async Task<IActionResult> RemoveMember(int groupId, int memberId)
        {
			User tokenUser;
			try { tokenUser = _authManager.AuthorizeWithJWT(HttpContext); }
			catch (InvalidTokenException ex) { return Unauthorized(ex.Message); }
            if (memberId == tokenUser.Id) return BadRequest("Vous ne pouvez pas vous retirer vous-même.");
            bool isAdmin = _context.GroupUsers.Any(x => x.IdUser == tokenUser.Id && x.IdGroup == groupId && (x.IsAdmin || x.IsSuperAdmin));
            if (!isAdmin) return NotFound("Vous n'etes pas admin de ce groupe");

            GroupUser? memberToRemove = await _context.GroupUsers.Where(x=> x.IdGroup == groupId && x.IdUser == memberId && x.IsSuperAdmin != true).FirstOrDefaultAsync();
            if (memberToRemove is null) return NotFound("L'utilisateur que vous voulez retirer n'existe pas ou est le fondateur!");

            Group? group = await  _context.Groups.Where(x => x.Id == groupId).Include(x=> x.GroupUsers).FirstOrDefaultAsync();

			//Reset draw if someone quit
			if (group.HasBeenDrawn)
            {
                group.HasBeenDrawn = false;
                group.DrawDate = null;
                foreach(GroupUser gu in group.GroupUsers)
                {
                    gu.IdDrawnUser = null;
                }
            }
            _context.GroupUsers.Remove(memberToRemove);
            int result =await _context.SaveChangesAsync();
            if (result == 0) return Problem("Something went wrong... no change were made");

            return Ok("L'utilisateur a bien été retiré");
		}

    }

}