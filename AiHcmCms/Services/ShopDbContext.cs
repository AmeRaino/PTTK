using AiHcmCms.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AiHcmCms.Models
{
    public class ShopDbContext : DbContext
    {
        public DbSet<Cake> Cakes { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<EndUser> EndUsers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }

        private string _connectionString = @"Server=TAB21;Database=MinhBakery;Integrated Security=SSPI;persist security info=True;";

        public ShopDbContext(string connectionString)
        {
            //_connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer(_connectionString);
        }
    }
}
