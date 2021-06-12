using AiHcmCms.Dtos.Orders;
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
        public IActionResult Get(int id)
        {
            return Ok(orderService.GetAllById(id));
        }

        [HttpGet("getorderdetailbyidord/{id}")]
        public IActionResult Get(string id)
        {
            return Ok(orderService.GetAllOrderDetailById(id));
        }

        [HttpGet("getallorderdetail")]
        public IActionResult GetAllOrderDetail()
        {
            return Ok(orderService.GetAllOrder());
        }


        [AllowAnonymous]
        [HttpPost("createorder")]
        public IActionResult createOrder([FromBody] Order model, AddOrderDetail modelDetail)
        {
            try
            {
                Order order = new Order
                {
                    CreatedDate = model.CreatedDate,
                    Total = model.Total,
                    IdCustomer = model.IdCustomer,
                    ShippingAdress = model.ShippingAdress,
                    //IsPaid = model.IsPaid,
                };

                // create user
                orderService.Create(order);

                foreach(Cake cake in modelDetail.cakeOrders)
                {
                    OrderDetail orderDetail = new OrderDetail
                    {
                        IdOrder = order.Id,
                        IdProduct = cake.ID,
                        Amount = cake.Amount,
                        Price = cake.Price,
                       Total = modelDetail.Total,
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
