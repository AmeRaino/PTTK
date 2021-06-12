using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AiHcmCms.Dtos.Products
{
    public class AddProducts
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int IDCategory { get; set; }
        public float Price { get; set; }
        public string Avatar { get; set; }
        public int Amount { get; set; }
        public float Discount { get; set; }
    }
}
