using AiHcmCms.Models.Order;
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
        private IHostingEnvironment hostingEnvironment;

        public OrderController(OrderService orderService, IHostingEnvironment hostingEnvironment)
        {
            this.orderService = orderService;
            this.hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(orderService.GetAll());
        }

        [HttpGet("getorderbyidcus/{id}")]
        public IActionResult Get(string id)
        {
            return Ok(orderService.GetAllById(id));
        }


        [AllowAnonymous]
        [HttpPost("createorder")]
        public IActionResult createOrder([FromBody] Order model)
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
