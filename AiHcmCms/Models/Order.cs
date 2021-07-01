using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AiHcmCms.Models
{
    [Table("Order")]
    public class Order
    {
        [Key]
        [StringLength(124)]
        public string Id { get; set; }
        public long CreatedDate { get; set; }
        public float Total { get; set; }
        public int IdCustomer { get; set; }
        [StringLength(250)]
        public string ShippingAdress  { get; set; }
        //public bool IsPaid { get; set; }


        //navigation props
        [ForeignKey("IdCustomer")]
        public EndUser Customer { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
    }
}
