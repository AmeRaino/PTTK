using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AiHcmCms.Models.Products
{
    public class Cake
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public Category Category { get; set; }
        public float Price { get; set; }
        public float Discount { get; set; }
        public int Amount { get; set; }
        public string Avatar { get; set; }
    }
}
