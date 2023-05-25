using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GiftExchange.Data;
using GiftExchange.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using GiftExchangeServer.Data.DTO;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using GiftExchangeServer.Exceptions;
using GiftExchangeServer.JWTUtils;

using GiftExchangeServer.Utils;
using System.Net.Mail;
using GiftExchangeServer.Data.Entities;

namespace GiftExchangeServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly GiftExchangeDbContext _context;
        private IConfiguration _config;
        private JwtUtils _authManager;

        public UsersController(GiftExchangeDbContext context, IConfiguration config)
        {
            _config = config;
            _context = context;
            _authManager = new JwtUtils(context, config);
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var adminUsers = await _context.Users.Where(u => u.IsSuperAdmin == true).ToListAsync();
            return adminUsers;
        }

        [HttpPost]
        [Route("/modifiyPassword")]
        public async Task<IActionResult> UpdatePassword(NewOldPassword passwords)
        {
            User tokenUser;
            try { tokenUser = _authManager.AuthorizeWithJWT(HttpContext); }
            catch (InvalidTokenException ex) { return Unauthorized(ex.Message); }

            if (!PasswordHasher.VerifyPassword(passwords.OldPassword,tokenUser.Password)) { return BadRequest("Le mot de passe fournit ne correspond pas a celui de l'utilisateur"); }
            User userToModified = _context.Users.Find(tokenUser.Id);
            userToModified.Password = PasswordHasher.HashPassword(passwords.NewPassword);
            int result = await _context.SaveChangesAsync();

            if (result == 0) { return BadRequest("Aucun changement n'a été effectué"); }

            return Ok("Le mot de passe a bien été modifié!");
        }

        // update the profil
        [HttpPost]
        [Route("/profil")]
        public async Task<ActionResult<UserProfilInfo>> UpdateProfil(UserProfilInfo user)
        {

            //Authorisation
            try { _authManager.AuthorizeWithJWT(HttpContext); }
            catch (InvalidTokenException ex) { return Unauthorized(ex.Message); }

            User userToModifed = _context.Users.Find(_authManager.getUserFromJwt(HttpContext).Id);

            //Verifie username does not match another user
            if (user.Username.ToUpper() != userToModifed.Username.ToUpper())
                if (_context.Users.Where(c => c.Username.ToUpper() == user.Username.ToUpper()).Any()) return BadRequest("Username is already used by another user");
			if (user.Email.ToUpper() != userToModifed.Email.ToUpper())
				if (_context.Users.Where(c => c.Email.ToUpper() == user.Email.ToUpper()).Any()) return BadRequest("Email is already used by another user");


			if (user.Username.Length <= 0 || !Validation.IsSimpleText(user.Username)) { return BadRequest("Nom d'utilisateur vide ou non valide!"); }
            if (user.Firstname.Length <= 0 || !Validation.IsName(user.Firstname)) { return BadRequest("Prénom vide ou non valide!"); }
            if (user.Lastname.Length <= 0 || !Validation.IsName(user.Lastname)) { return BadRequest("Nom de famille vide ou non valide!"); }
            if (user.Email.Length <= 0 || !Validation.IsEmail(user.Email)) { return BadRequest("Email vide ou non valide!"); }
            //Make database change
            userToModifed.Username = user.Username;
            userToModifed.Firstname = user.Firstname;
            userToModifed.Lastname = user.Lastname;
            userToModifed.Email = user.Email;

            //need to implement regex validation here

            int result = await _context.SaveChangesAsync();

            //If database result in no change, return badrequest
            if (result == 0) return BadRequest("No change where made");

            //Generate new token 
            user.Token = getTokenGeneratedFromUser(userToModifed);

            return Ok(user);
        }

        [HttpGet]
        [Route("/profil")]
        public async Task<ActionResult<UserProfilInfo>> GetProfilInfo()
        {
            //Authorisation
            try { _authManager.AuthorizeWithJWT(HttpContext); }
            catch (InvalidTokenException ex) { return Unauthorized(ex.Message); }

            //Map user to DTO
            User? user = _context.Users.Find(_authManager.getUserFromJwt(HttpContext)?.Id);

            UserProfilInfo userInfo = new UserProfilInfo(user);

            //Return DTO
            return Ok(userInfo);
        }

        [HttpPost]
        [Route("/createUser")]
        public async Task<ActionResult<User>> PostCreateUser(UserRegisterRequest user)
        {
            if (user == null) return BadRequest("La requetes n'a pas bien été demandé");

            if (user.Username.IsNullOrEmpty() || !Validation.IsSimpleText(user.Username)) return BadRequest("Le username ne peut pas être vide ou de format incorrect");
            if (user.Password.IsNullOrEmpty() || !Validation.IsPassword(user.Password)) return BadRequest("Le mot de passe ne peut pas être vide ou de format incorrect");
            if (user.Email.IsNullOrEmpty() || !Validation.IsEmail(user.Email)) return BadRequest("Le email ne peut pas être vide ou de format incorrect");
            if (_context.Users.Any(x => x.Email == user.Email)) return BadRequest("Ce email est déjà pris!");
            if (user.Firstname.IsNullOrEmpty() || !Validation.IsName(user.Firstname)) return BadRequest("Le prenom ne peut pas etre vide ou de format incorrect");
            if (user.Lastname.IsNullOrEmpty() || !Validation.IsName(user.Lastname)) return BadRequest("Le nom de famille ne peut pas être vide ou de format incorrect");
            user.Password = PasswordHasher.HashPassword(user.Password);

            if (_context.Users.Where((u) => u.Username == user.Username).Any()) return BadRequest("Le username existe déjà dans la base de donnée");

            User userToAdd = new User()
            {
                Username = user.Username,
                Email = user.Email,
                Lastname = user.Lastname,
                Firstname = user.Firstname,
                Password = user.Password,
            };
            _context.Users.Add(userToAdd);

 

            int result = await _context.SaveChangesAsync();

            if (result == 0)
                return BadRequest("Un problème est survenu, aucun utilisateur n'a été ajouté a la base de donnée");
            return Ok("L'utilisateur a bien été ajouté");
        }


        [AllowAnonymous]
        [HttpPost]
        [Route("/login")]
        public async Task<ActionResult<User>> PostLogin(UserLoginRequest user_from_body)
        {
            User? user_from_db = Authenticate(user_from_body);
            if (user_from_db is null) return NotFound("Le nom d'utilisateur et le mot de passe fournit ne correspondent pas a un utilisateur dans la base de donnée");

            UserProfilInfo user_to_return = new UserProfilInfo(user_from_db);
            user_to_return.Token = getTokenGeneratedFromUser(user_from_db);


            return Ok(user_to_return);

        }

        //https://www.youtube.com/watch?v=kM1fPt1BcLc&ab_channel=CodewithJulian
        [ApiExplorerSettings(IgnoreApi = true)]
        private string getTokenGeneratedFromUser(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Authentication, user.Id.ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.GivenName, user.Firstname),
                new Claim(ClaimTypes.Surname, user.Lastname),
                new Claim(ClaimTypes.Sid, user.Password)
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMonths(6),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

		[ApiExplorerSettings(IgnoreApi = true)]
		private bool UserExists(string username, string email)
        {
            return _context.Users.Where((x) => x.Username == username && x.Email == email).Any();
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        private User? Authenticate(UserLoginRequest user)
        {
            User userFromDB = _context.Users.Where(o => o.Username == user.Username).FirstOrDefault();
            if (userFromDB is null) return null;
            if (PasswordHasher.VerifyPassword(user.Password, userFromDB.Password)) return userFromDB;
            else return null;
        }

        [HttpPost]
        [Route("/retrievepassword")]
        public async Task<ActionResult<string>> SendPassword( RetrievePassword email)
        {
            User? user = await _context.Users.Where(u => u.Email == email.Email).FirstOrDefaultAsync();

            if (user is null)
            {
                return BadRequest("Email invalide!");
            }

            string newPassword = GeneratePassword(10, 2);

            user.Password = PasswordHasher.HashPassword(newPassword);
            await _context.SaveChangesAsync();

            string message = "Bonjour " + user.Firstname + " " + user.Lastname + " ,<br/>Vous avez demandé un nouveau mot de passe pour votre compte. Voici votre nouveau mot de passe: <b>" + newPassword + "</b>";

            Email.SendEmail(email.Email, "Nouveau mot de passe", message);

            return Ok("Un nouveau mot de passe a été envoyé à votre adresse e-mail!");
        }

        public static string GeneratePassword(int length, int numberOfNonAlphanumericCharacters)
        {
            const string alphanumericChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            const string nonAlphanumericChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

            Random random = new Random();

            string password = new string(Enumerable.Repeat(alphanumericChars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());

            for (int i = 0; i < numberOfNonAlphanumericCharacters; i++)
            {
                int position = random.Next(0, password.Length);
                char nonAlphanumericChar = nonAlphanumericChars[random.Next(nonAlphanumericChars.Length)];
                password = password.Insert(position, nonAlphanumericChar.ToString());
            }

            return password;
        }


    }
}

