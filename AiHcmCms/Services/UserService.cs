using AiHcmCms.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AiHcmCms.Services
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
        IEnumerable<User> GetAll();
        User GetById(int id);
        User Create(User user);
        User Update(User user);
        void Delete(int id);
    }

    public class UserService : IUserService
    {

        private static List<User> users = new List<User>();
        private static List<UserRole> userRoles = new List<UserRole> ();
        private static int Count = 1;
        public UserService() {

            userRoles.Add(new UserRole
            {
                Id = 1,
                Title = "Administrator "
            });

            userRoles.Add(new UserRole
            {
                Id = 2,
                Title = "Author"
            });

            users.Add(new User
            {
                Id = Count++,
                FirstName = "Admin",
                LastName = "",
                Username = "admin",
                Password = "admin",
                CreatedDate = 1620110775822,
                Avatar = "https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg",
                //Role = userRoles[0]
            });

            users.Add(new User
            {
                Id = Count++,
                FirstName = "test",
                LastName = "",
                Username = "test",
                Password = "test",
                CreatedDate = 1620110775822,
                Avatar = "https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg",
                //Role = userRoles[1]
            });
        }
        //private static UserService _instance;

        //public static UserService GetInstance()
        //{
        //    if (_instance == null)
        //    {
        //        _instance = new UserService();
        //    }
        //    return _instance;
        //}

        public User Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null;

            return users.Where(user => user.Password == password && user.Username == username).FirstOrDefault();
        }

        public User Create(User user)
        {
            if (string.IsNullOrWhiteSpace(user.Username))
                throw new ApplicationException("Username is required!");

            if (string.IsNullOrWhiteSpace(user.Password))
                throw new ApplicationException("Password is required!");

            if (users.Any(x => x.Username == user.Username))
                throw new ApplicationException("Username \"" + user.Username + "\" is already taken");

            user.Id = Count++;
            users.Add(user);
            return user;
        }

        public void Delete(int id)
        {
            users.RemoveAll(n => n.Id == id);
        }

        public IEnumerable<User> GetAll()
        {
            return ((IEnumerable<User>)users).ToList();
        }

        public User GetById(int id)
        {
            return users.Where(user => user.Id == id).FirstOrDefault();
        }

        public User Update(User user)
        {
            User found = users.Where(n => n.Id == user.Id).FirstOrDefault();
            if (found == null)
                throw new ApplicationException("User not found");

            //if (!string.IsNullOrWhiteSpace(user.Username) && user.Username != found.Username)
            //    found.Username = user.Username;

            if (!string.IsNullOrEmpty(user.FirstName))
                found.FirstName = user.FirstName;

            if (!string.IsNullOrEmpty(user.LastName))
                found.LastName = user.LastName;

            if (!string.IsNullOrWhiteSpace(user.Password))
                found.Password = user.Password;

            //if (user.Role != null)
            //    found.Role = user.Role;

            if (!string.IsNullOrWhiteSpace(user.Email))
                found.Email = user.Email;

            if (!string.IsNullOrWhiteSpace(user.Phone))
                found.Phone = user.Phone;

            if (!string.IsNullOrWhiteSpace(user.Avatar))
                found.Avatar = user.Avatar;

            return found;
        }

        public void updateAvatar(int id, string avatarPath)
        {
            User found = users.Where(n => n.Id == id).FirstOrDefault();
            if (found == null)
                throw new ApplicationException("User not found");

            found.Avatar = avatarPath;
        }

        public IEnumerable<UserRole> GetUserRoles()
        {
            return userRoles;
        }

        public UserRole GetRole(int id)
        {
            return userRoles.Where(user => user.Id == id).FirstOrDefault();
        }
    }
}
