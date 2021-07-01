using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AiHcmCms.Models
{
    [Table("Category")]
    public class Category
    {
        [Key]
        public int ID { get; set; }
        [StringLength(250)]
        public string Name { get; set; }
    }
}
