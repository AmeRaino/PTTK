using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AiHcmCms.Models.Order
{
    public class Order
    {
        public string Id { get; set; }
        public long CreatedDate { get; set; }
        public float Total { get; set; }
        public string IdCustomer { get; set; }
        public string ShippingAdress  { get; set; }
        //public bool IsPaid { get; set; }
    }
}
