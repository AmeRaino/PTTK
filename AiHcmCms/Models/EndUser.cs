using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AiHcmCms.Models
{
    [Table("Customer")]
    public class EndUser
    {
        [Key]
        public int Id { get; set; }
        [StringLength(124)]
        public string Username { get; set; }
        [StringLength(124)]
        public string Name { get; set; }
        [StringLength(124)]
        public string Password { get; set; }
        [StringLength(100)]
        public string Email { get; set; }
        [StringLength(15)]
        public string Phone { get; set; }
        [StringLength(250)]
        public string Address { get; set; }
    }
}
