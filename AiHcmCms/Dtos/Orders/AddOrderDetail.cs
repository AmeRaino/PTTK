using AiHcmCms.Models.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AiHcmCms.Dtos.Orders
{
    public class AddOrderDetail
    {
        public List<Cake> cakeOrders { get; set; }
        public float Total { get; set; }

    }
}
