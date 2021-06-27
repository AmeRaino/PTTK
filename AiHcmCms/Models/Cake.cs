using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AiHcmCms.Models
{
    [Table("Cake")]
    public class Cake
    {
        [Key]
        public int ID { get; set; }
        public int IdCategory { get; set; }

        [StringLength(250)]
        public string Name { get; set; }
        public float Price { get; set; }
        public float Discount { get; set; }
        public int Amount { get; set; }
        [StringLength(250)]
        public string Avatar { get; set; }


        // navigation props
        [ForeignKey("IdCategory")]
        public Category Category { get; set; }

    }
}
