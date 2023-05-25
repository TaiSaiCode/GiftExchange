using GiftExchange.Data.Entities;
using GiftExchangeServer.Data.DTO;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Text;

namespace GiftExchangeServer.Utils
{
    public class Email
    {
        public static void SendEmail(User user, string subject, string message)
        {
            string to = user.Email; //To address    
            string from = "giftablefun@zohomail.com"; //From address    
            MailMessage mail_message = new MailMessage(from, to);

			mail_message.Subject = subject;
			mail_message.Body = message;
			mail_message.BodyEncoding = Encoding.UTF8;
			mail_message.IsBodyHtml = true;
            SmtpClient client = new SmtpClient("smtp.zoho.com", 587); //Zoho mail smtp    
            System.Net.NetworkCredential basicCredential1 = new
            System.Net.NetworkCredential("giftablefun@zohomail.com", "Gy50Yfc2pTyw");
            client.EnableSsl = true;
            client.UseDefaultCredentials = false;
            client.Credentials = basicCredential1;

            client.Send(mail_message);

        }
		public static void SendEmail(UserInvite user, string subject, string message)
		{
			string to = user.Email; //To address    
			string from = "giftablefun@zohomail.com"; //From address    
			MailMessage mail_message = new MailMessage(from, to);

			mail_message.Subject = subject;
			mail_message.Body = message;
			mail_message.BodyEncoding = Encoding.UTF8;
			mail_message.IsBodyHtml = true;
			SmtpClient client = new SmtpClient("smtp.zoho.com", 587); //Zoho mail smtp    
			System.Net.NetworkCredential basicCredential1 = new
			System.Net.NetworkCredential("giftablefun@zohomail.com", "Gy50Yfc2pTyw");
			client.EnableSsl = true;
			client.UseDefaultCredentials = false;
			client.Credentials = basicCredential1;

			client.Send(mail_message);

		}
		public static void SendEmail(string email, string subject, string message)
        {
            string to = email; //To address    
            string from = "giftablefun@zohomail.com"; //From address    
            MailMessage mail_message = new MailMessage(from, to);

            mail_message.Subject = subject;
            mail_message.Body = message;
            mail_message.BodyEncoding = Encoding.UTF8;
            mail_message.IsBodyHtml = true;
            SmtpClient client = new SmtpClient("smtp.zoho.com", 587); //Zoho mail smtp    
            System.Net.NetworkCredential basicCredential1 = new
            System.Net.NetworkCredential("giftablefun@zohomail.com", "Gy50Yfc2pTyw");
            client.EnableSsl = true;
            client.UseDefaultCredentials = false;
            client.Credentials = basicCredential1;

            client.Send(mail_message);

        }
    }
}
