using AiHcmCms.Dtos.Posts;
using AiHcmCms.Dtos.Products;
using AiHcmCms.Models;
using AiHcmCms.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
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

        [HttpGet("getcategories")]
        public IActionResult GetCategories()
        {
            return Ok(productService.GetCategories());
        }


        [HttpGet("getProductById/{id}")]
        public IActionResult GetProductById(int id)
        {
            return Ok(productService.GetById(id));
        }

        [HttpPost("UploadImage")]
        public IActionResult UploadImage([FromForm] ImageUpload objFile)
        {
            try
            {
                if (objFile.upload.Length > 0)
                {
                    if (!Directory.Exists(hostingEnvironment.WebRootPath + "\\Upload\\"))
                    {
                        Directory.CreateDirectory(hostingEnvironment.WebRootPath + "\\Uploads\\");
                    }
                    var path = "\\Uploads\\" + objFile.upload.FileName;
                    using (FileStream fileStream = System.IO.File.Create(hostingEnvironment.WebRootPath + path))
                    {
                        objFile.upload.CopyTo(fileStream);
                        fileStream.Flush();

                        return Ok(new
                        {
                            // Nếu dùng để trả cho web thì dùng dòng này
                            url = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}" + path

                            // Còn nếu muốn dùng cho máy ảo thì chỉ trả về path thôi
                            // url = path
                        });
                    }
                }
                else
                {
                    return BadRequest("failed");
                }
            }
            catch (ApplicationException ex)
            {
                return BadRequest(ex.Message.ToString());
            }
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
