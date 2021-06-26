using AiHcmCms.Models.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AiHcmCms.Dtos.Orders
{
    public class OrderDTO
    {
        public long CreatedDate { get; set; }
        public float Total { get; set; }
        public string IdCustomer { get; set; }
        public string ShippingAdress { get; set; }
        public List<Cake> Cakes { get; set; }

    }
}
