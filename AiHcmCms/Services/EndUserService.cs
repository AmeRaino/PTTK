using AiHcmCms.Models.EndUser;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AiHcmCms.Services
{
    public interface IEndUserService
    {
        EndUser Authenticate(string username, string password);
        EndUser GetById(string id);
        EndUser Create(EndUser user);
        EndUser Update(EndUser user);
    }
    public class EndUserService : IEndUserService
    {
        private static List<EndUser> users = new List<EndUser>();
        private static int Count = 1;
        public EndUserService()
        {
            users.Add(new EndUser
            {
                Username = "guest",
                Password = "guest",
                Name = "Guest Minh Oc cho"
            });
        }
        public IEnumerable<EndUser> GetAll()
        {
            return ((IEnumerable<EndUser>)users).ToList();
        }
        public EndUser Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null;

            return users.Where(user => user.Password == password && user.Username == username).FirstOrDefault();
        }

        public EndUser Create(EndUser user)
        {
            if (string.IsNullOrWhiteSpace(user.Username))
                throw new ApplicationException("Username is required!");

            if (string.IsNullOrWhiteSpace(user.Password))
                throw new ApplicationException("Password is required!");

            if (users.Any(x => x.Username == user.Username))
                throw new ApplicationException("Username \"" + user.Username + "\" is already taken");

            users.Add(user);
            return user;
        }

        public EndUser GetById(string id)
        {
            return users.Where(user => user.Username == id).FirstOrDefault();
        }

        public EndUser Update(EndUser user)
        {
            EndUser found = users.Where(n => n.Username == user.Username).FirstOrDefault();
            if (found == null)
                throw new ApplicationException("User not found");

            if (!string.IsNullOrEmpty(user.Name))
                found.Name = user.Name;

            if (!string.IsNullOrWhiteSpace(user.Email))
                found.Email = user.Email;

            if (!string.IsNullOrWhiteSpace(user.Phone))
                found.Phone = user.Phone;

            if (!string.IsNullOrWhiteSpace(user.Password))
                found.Password = user.Password;

            return found;
        }
    }
}
