using AiHcmCms.Dtos.Products;
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
    public class ProductController : ControllerBase
    {
        private readonly ProductService productService;
        private IHostingEnvironment hostingEnvironment;

        public ProductController(ProductService productService, IHostingEnvironment hostingEnvironment)
        {
            this.productService = productService;
            this.hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(productService.GetAll());
        }

        [HttpGet("{getcategories}")]
        public IActionResult Get(int id)
        {
            return Ok(productService.GetCategories());
        }


        [HttpGet("getProductById/{id}")]
        public IActionResult GetProductById(int id)
        {
            return Ok(productService.GetById(id));
        }



        [AllowAnonymous]
        [HttpPost("addproduct")]
        public IActionResult addProduct([FromBody] AddProducts  model)
        {
            try
            {
                Cake cake = new Cake
                {
                    Name = model.Name,
                    Price = model.Price,
                    Amount = model.Amount,
                    Avatar = model.Avatar,
                    Discount = model.Discount,
                    Category = productService.GetCategoryByID(model.IDCategory)
                };

                // create user
                productService.Create(cake);
                return Ok();
            }
            catch (ApplicationException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] AddProducts model)
        {
            var cake = new Cake()
            {
                ID = id,
                Name = model.Name,
                Price = model.Price,
                Amount = model.Amount,
                Avatar = model.Avatar,
                Discount = model.Discount,
                Category = productService.GetCategoryByID(model.IDCategory)
            };

            try
            {
                cake = productService.Update(cake);
                return Ok(new
                {
                    cake.ID,
                    cake.Name,
                    cake.Price,
                    cake.Amount,
                    cake.Discount,
                    cake.Avatar,
                    cake.Category,
                });
            }
            catch (ApplicationException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
