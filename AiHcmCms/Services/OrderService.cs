using AiHcmCms.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AiHcmCms.Services
{
    public interface IOrderService
    {
        IEnumerable<Order> GetAll();
        IEnumerable<Order> GetAllById(int id);
        Order GetById(string id);
        Order Create(Order order);
        OrderDetail CreateOrderDetail(OrderDetail orderDetail);
        IEnumerable<OrderDetail> GetAllOrder();
        IEnumerable<OrderDetail> GetAllOrderDetailById(string id);
        //Order Update(Order order);
        string generateID();
    }

    public class OrderService: IOrderService
    {
        private static List<Order> orders = new List<Order>();
        private static List<OrderDetail> ordersDetail = new List<OrderDetail>();
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
                IdCustomer = 1,
                ShippingAdress = "HCM",
                //IsPaid = false

            });

            ordersDetail.Add(new OrderDetail
            {
                Id = generateID(),
                IdOrder = orders.ElementAt(0).Id,
                Amount = 2,
                IdProduct = 1,
                Price = 10000,
            });

            ordersDetail.Add(new OrderDetail
            {
                Id = generateID(),
                IdOrder = orders.ElementAt(0).Id,
                Amount = 3,
                IdProduct = 2,
                Price = 10000,
            });

        }
        public IEnumerable<Order> GetAllById(int id)
        {
            IEnumerable<Order> list;
            list = orders.Where(x => x.IdCustomer == id);
            return list;
        }

        public Order Create(Order order)
        {   
            orders.Add(order);
            return order;
        }

        public OrderDetail CreateOrderDetail(OrderDetail orderDetail)
        {
            orderDetail.Id = generateID();
            ordersDetail.Add(orderDetail);
            return orderDetail;

        } 
            

        public IEnumerable<Order> GetAll()
        {
            return ((IEnumerable<Order>)orders).ToList();
        }

        public IEnumerable<OrderDetail> GetAllOrder()
        {
            return ((IEnumerable<OrderDetail>)ordersDetail).ToList();
        }

        public IEnumerable<OrderDetail> GetAllOrderDetailById(string id)
        {
            return ((IEnumerable<OrderDetail>)ordersDetail).ToList().Where(orderDetail => orderDetail.IdOrder == id);
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

