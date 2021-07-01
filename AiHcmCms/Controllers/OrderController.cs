using AiHcmCms.Dtos.Orders;
using AiHcmCms.Dtos.Products;
using AiHcmCms.Models.Order;
using AiHcmCms.Models.Products;
using AiHcmCms.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AiHcmCms.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("MyPolicy")]
    public class OrderController : ControllerBase
    {
        private readonly OrderService orderService;
        private readonly ProductService productService;
        private IHostingEnvironment hostingEnvironment;

        public OrderController(OrderService orderService, ProductService productService, IHostingEnvironment hostingEnvironment)
        {
            this.orderService = orderService;
            this.hostingEnvironment = hostingEnvironment;
            this.productService = productService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(orderService.GetAll());
        }

        [HttpGet("getorderbyidcus/{id}")]
        public IActionResult GetOrderByIdCustomer(string id)
        {
            return Ok(orderService.GetAllById(id));
        }

        [HttpGet("getorderdetailbyidord/{id}")]
        public IActionResult Get(string id)
        {
            Order order = orderService.GetById(id);
            List<int> idProducts = new List<int>();
            IEnumerable<OrderDetail> listOrdDetail = orderService.GetAllOrderDetailById(id);

            var cakes = from product in productService.GetAll()
                         join detail in listOrdDetail on product.ID equals detail.IdProduct
                         select new { quantity = detail.Amount, price = detail.Price, total = detail.Total, product.Name, product.Avatar, categoryName = product.Category.Name };
            return Ok(new
            {
                order,
                listDetails = cakes,
            }); 
        }


        [HttpGet("getorderdetailbyidcus/{id}")]
        public IActionResult GetOrderDetailByIdCus(string id)
        {
            IEnumerable<Order> orders = orderService.GetAllById(id);
            List<OrderDetailDto> orderDetailDtos = new List<OrderDetailDto>();
      
            foreach(Order mOrder in orders)
            {
                Order order = orderService.GetById(mOrder.Id);
                List<int> idProducts = new List<int>();
                IEnumerable<OrderDetail> listOrdDetail = orderService.GetAllOrderDetailById(mOrder.Id);

                var cakes = from product in productService.GetAll()
                            join detail in listOrdDetail on product.ID equals detail.IdProduct
                            select new { quantity = detail.Amount, price = detail.Price, total = detail.Total, product.Name, product.Avatar, categoryName = product.Category.Name };
                orderDetailDtos.Add(new OrderDetailDto(order, cakes));
            }
            return Ok(orderDetailDtos);
        }

        [HttpGet("getallorderdetail")]
        public IActionResult GetAllOrderDetail()
        {
            return Ok(orderService.GetAllOrder());
        }



        [HttpGet("getAllProductInOrderDetail/{id}")]
        public IActionResult getAllProdIdInOrdDetail(string id)
        {
            List<int> idProducts = new List<int>();
            IEnumerable<OrderDetail> listOrdDetail = orderService.GetAllOrderDetailById(id);
            foreach(OrderDetail orderDetail in listOrdDetail)
            {
                idProducts.Add(orderDetail.IdProduct);
            }
            List<Cake> cakes = new List<Cake>();
            foreach(int idPro in idProducts)
            {
                Cake cake = productService.GetById(idPro);
                cakes.Add(cake);
            }
            return Ok(cakes);
        }


        [HttpPost("createorder")]
        public IActionResult createOrder([FromBody] OrderDTO model)
        {
            try
            {
                string id = orderService.generateID();
                Order order = new Order
                {
                    Id = id,
                    CreatedDate = model.CreatedDate,
                    Total = model.Total,
                    IdCustomer = model.IdCustomer,
                    ShippingAdress = model.ShippingAdress,
                    //IsPaid = model.IsPaid,
                };

                // create user
                orderService.Create(order);

                foreach (Cake cake in model.Cakes)
                {
                    //Cake cake = productService.GetById(idCake);
                    OrderDetail orderDetail = new OrderDetail
                    {
                        IdOrder = id,
                        IdProduct = cake.ID,
                        Amount = cake.Amount,
                        Price = cake.Price,
                        Total = cake.Price * cake.Amount,
                    };

                    orderService.CreateOrderDetail(orderDetail);
                    productService.UpdateAmount(cake);
                }
                return Ok();
            }
            catch (ApplicationException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

    }
}
