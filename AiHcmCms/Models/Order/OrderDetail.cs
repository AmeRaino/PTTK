using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AiHcmCms.Models.Order
{
    public class OrderDetail
    {
        public string Id { get; set; }
        public string IdOrder { get; set; }
        public int IdProduct { get; set; }
        public float Price { get; set; }
        public int Amount { get; set; }
        public float Total { get; set; }

        public float getTotalPrice()
        {
            return Total = Price * Amount;
        }
    }
}
