using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AiHcmCms.Models
{
    [Table("OrderDetail")]
    public class OrderDetail
    {
        [Key]
        [StringLength(124)]
        public string Id { get; set; }
        [StringLength(124)]
        public string IdOrder { get; set; }
        public int IdProduct { get; set; }
        public float Price { get; set; }
        public int Amount { get; set; }
        public float Total { get; set; }

        //navigation props
        [ForeignKey("IdProduct")]
        public Cake Cake { get; set; }

        [ForeignKey("IdOrder")]
        public Order Order { get; set; }

        public float getTotalPrice()
        {
            return Total = Price * Amount;
        }
    }
}
