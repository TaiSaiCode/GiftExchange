using System.Security.Cryptography;

namespace GiftExchangeServer.JWTUtils
{



public class PasswordHasher { 

		public static bool VerifyPassword(string enteredPassword, string storedHash) {
			/* Extract the bytes from the stored hash */ 
			byte[] hashBytes = Convert.FromBase64String(storedHash); 
			/* Get the salt from the hash bytes */ 
			byte[] salt = new byte[16]; 
			Array.Copy(hashBytes, 0, salt, 0, 16); 
			/* Hash the entered password with the stored salt */ 
			var pbkdf2 = new Rfc2898DeriveBytes(enteredPassword, salt, 10000); 
			byte[] hash = pbkdf2.GetBytes(20);
			/* Compare the resulting hash with the stored hash */
			for (int i = 0; i < 20; i++) { 
				if (hashBytes[i + 16] != hash[i]) 
					return false; } 
			return true; 
		}

		public static string HashPassword(string password)
		{
			// Generate a random salt
			byte[] salt = new byte[16];
			using (var rng = new RNGCryptoServiceProvider())
			{
				rng.GetBytes(salt);
			}

			// Hash the password with PBKDF2 using the salt
			var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000);
			byte[] hash = pbkdf2.GetBytes(20);

			// Combine the salt and hash bytes into a single byte array
			byte[] hashBytes = new byte[36];
			Array.Copy(salt, 0, hashBytes, 0, 16);
			Array.Copy(hash, 0, hashBytes, 16, 20);

			// Convert the salted hash to Base64 format for storage
			return Convert.ToBase64String(hashBytes);
		}


	}






}
