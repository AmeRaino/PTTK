using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AiHcmCms.Dtos.Products
{
    public class CakeOrderDto
    {
        public CakeOrderDto(string name, string categoryName, float price, float total, int quantity, string avatar)
        {
            Name = name;
            CategoryName = categoryName;
            Price = price;
            Total = total;
            Quantity = quantity;
            Avatar = avatar;
        }

        public string Name { get; set; }
        public string CategoryName { get; set; }
        public float Price { get; set; }
        public float Total { get; set; }
        public int Quantity { get; set; }
        public string Avatar { get; set; }
    }
}
