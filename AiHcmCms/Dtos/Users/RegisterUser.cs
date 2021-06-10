using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AiHcmCms.Models.Users
{
    public class RegisterUser
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public long CreatedDate { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        public int IdRole { get; set; }

    }
}
