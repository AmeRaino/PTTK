using AiHcmCms.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AiHcmCms.Dtos.Orders
{
    public class OrderDetailDto
    {
        public Order order;

        public IEnumerable<Object> cakes;

        public OrderDetailDto(Order order, IEnumerable<Object> cakes)
        {
            this.order = order;
            this.cakes = cakes;
        }
    }

}
