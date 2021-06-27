using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AiHcmCms.Models
{
    [Table("Admin")]
    public class User
    {
        [Key]
        public int Id { get; set; }
        [StringLength(124)]
        public string FirstName { get; set; }
        [StringLength(124)]
        public string LastName { get; set; }
        [StringLength(124)]
        public string Username { get; set; }
        [StringLength(124)]
        public string Password { get; set; }
        //public UserRole Role { get; set; }
        public long CreatedDate { get; set; }
        [StringLength(124)]
        public string Email { get; set; }
        [StringLength(15)]
        public string Phone { get; set; }
        [StringLength(200)]
        public string Avatar { get; set; }

        public string GetFullName()
        {
            return FirstName + " " + LastName;
        }
    } 
}
