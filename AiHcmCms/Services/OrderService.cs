using AiHcmCms.Models.Order;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AiHcmCms.Services
{
    public interface IOrderService
    {
        IEnumerable<Order> GetAll();
        IEnumerable<Order> GetAllById(string id);
        Order GetById(string id);
        Order Create(Order order);
        //Order Update(Order order);
        string generateID();
    }

    public class OrderService: IOrderService
    {
        private static List<Order> orders = new List<Order>();
        public OrderService()
        {
            orders.Add(new Order
            {
                Id = generateID(),
                CreatedDate = 1620110775822,
                Total = 100000,
                IdCustomer = 1,
                ShippingAdress = "HCM",
                //IsPaid = false

            }); ;

            orders.Add(new Order
            {
                Id = generateID(),
                CreatedDate = 1620110775822,
                Total = 200000,
                IdCustomer = 1,
                ShippingAdress = "DN",
                //IsPaid = false

            });

            orders.Add(new Order
            {
                Id = generateID(),
                CreatedDate = 1620110775822,
                Total = 150000,
                IdCustomer = 1,
                ShippingAdress = "HN",
                //IsPaid = false

            });

            orders.Add(new Order
            {
                Id = generateID(),
                CreatedDate = 1620110775822,
                Total = 300000,
                IdCustomer = 2,
                ShippingAdress = "HCM",
                //IsPaid = false

            });

        }
        public IEnumerable<Order> GetAllById(string id)
        {
            return ((IEnumerable<Order>)orders).ToList().Where(x => x.Id == id);
        }

        public Order Create(Order order)
        {
            order.Id = generateID();
            orders.Add(order);
            return order;
        }

        public IEnumerable<Order> GetAll()
        {
            return ((IEnumerable<Order>)orders).ToList();
        }

        public Order GetById(string id)
        {
            return orders.Where(order => order.Id == id).FirstOrDefault();
        }

        //public Order Update(Order order)
        //{
        //    Order found = orders.Where(n => n.Id == order.Id).FirstOrDefault();
        //    if (found == null)
        //        throw new ApplicationException("User not found");

        //    //if (!string.IsNullOrWhiteSpace(user.Username) && user.Username != found.Username)
        //    //    found.Username = user.Username;

        //    if (order.IsPaid != null)
        //        found.IsPaid = order.IsPaid;


        //    return found;
        //}

        public string generateID()
        {
            return Guid.NewGuid().ToString("N");
        }
    }
}

