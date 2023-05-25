using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.Extensions.FileSystemGlobbing.Internal;
using System.Text.RegularExpressions;
using static System.Net.Mime.MediaTypeNames;
using static System.Net.WebRequestMethods;

namespace GiftExchangeServer.Utils
{
	public class Validation
	{
		public static bool RegexCheck(string pattern, string toValidate)
		{
			Match m = Regex.Match(toValidate, pattern, RegexOptions.IgnoreCase);

			return m.Success;
		}
		public static bool IsEmail(string email)
		{
			if (email == null) { throw new Exception("Vous devez fournir un email!"); }

			string pattern = "^[A-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Z0-9.-]+$";

			return RegexCheck(pattern, email);


		}

		public static bool IsSimpleText(string text)
		{

			if (text == null) throw new Exception("Vous devez fournir un parametre!");
			string pattern = "^[a-zA-Z0-9]+$";

			return RegexCheck(pattern, text);
		}
		public static bool IsName(string name)
		{
			if (name == null) throw new Exception("Vous devez fournir un parametre!");
			string pattern = "^[a-zA-Z0-9\\u00C0-\\u024F\\s'’-]+$";

			return RegexCheck(pattern, name);
		}

		public static bool IsPhone(string phone)
		{
			if (phone == null) throw new Exception("Vous devez fournir un numéro de téléphone!");
			string pattern = "^[(]?[0-9]{3}[)]?[ ,-]?[0-9]{3}[ ,-]?[0-9]{4}$";

			return RegexCheck(pattern, phone);
		}

		public static bool IsUrl(string url)
		{
			if (url == null) throw new Exception("Vous devez fournir un URL!");
			string pattern = "^(https ?| ftp | www.):\\/\\/[^\\s /$.?#].[^\\s]*$";
			return RegexCheck(pattern, url);
		}


		public static bool IsPassword(string pwd)
		{
			if (pwd == null) throw new Exception("Vous devez fournir un mot de passe!");
			string pattern = "^(?=.*[!@#$%^&*()_+-={}|[\\]\\\\:;\"'<>,.?/~])(?=.*[a-zA-Z]).{5,}$";
			return RegexCheck(pattern, pwd);
		}



	}
}
