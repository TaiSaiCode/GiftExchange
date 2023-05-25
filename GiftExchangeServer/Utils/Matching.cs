using GiftExchange.Data.Entities;
using Microsoft.AspNetCore.Mvc;

namespace GiftExchangeServer.Utils
{
    public class Matching
    {
        
        public static GroupUser getRandomReceiver(IList<GroupUser> remainings, GroupUser giver)
        {
            IList<GroupUser> copy = copyOfArrayWithout(remainings, remainings.IndexOf(giver));
            return copy[new Random().Next(remainings.Count)];
        }
        public static List<GroupUser> copyOfArrayWithout(IList<GroupUser> list, int index)
        {

            List<GroupUser> newlist = new List<GroupUser>(list);
            if(index >= 0) 
            newlist.RemoveAt(index);
            return newlist;
        }


		public static List<int> ShuffleUsers(List<int> usersId)
		{
			Random random = new Random((int)(DateTime.Now.Ticks ));
			List<int> shuffledUsers = new List<int>(usersId);

			// Shuffle the users using Fisher-Yates algorithm
			for (int i = shuffledUsers.Count - 1; i > 0; i--)
			{
				//Generate random index between 0 and i
				int randomIndex = random.Next(i + 1);

				// Swap the elements at randomIndex and i
				int temp = shuffledUsers[randomIndex];
				shuffledUsers[randomIndex] = shuffledUsers[i];
				shuffledUsers[i] = temp;
			}

			for (int i = 0; i < usersId.Count; i++)
			{
				int user = usersId[i];
				int shuffledUser = shuffledUsers[i];

				// If a user is assigned to themselves, swap their assigned user with the next user
				if (user == shuffledUser)
				{
					int nextIndex = (i + 1) % usersId.Count; 
					shuffledUsers[i] = shuffledUsers[nextIndex];
					shuffledUsers[nextIndex] = shuffledUser;
				}
			}

			return shuffledUsers;
		}

	}
}
