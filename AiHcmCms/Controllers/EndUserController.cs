using AiHcmCms.Dtos.EndUser;
using AiHcmCms.Models;
using AiHcmCms.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AiHcmCms.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("MyPolicy")]
    public class EndUserController : Controller
    {
        private readonly EndUserService _endUserService;
        private IHostingEnvironment _hostingEnvironment;
        public EndUserController(EndUserService endUserService, IHostingEnvironment hostingEnvironment)
        {
            this._endUserService = endUserService;
            this._hostingEnvironment = hostingEnvironment;
        }
        [HttpGet]
        public IActionResult Get()
        {
            var users = _endUserService.GetAll();
            return Ok(users);
        }

        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] AuthenticateEndUser model)
        {
            EndUser result = _endUserService.Authenticate(model.Username, model.Password);
            if (result == null)
            {
                return StatusCode(500, new
                {
                    message = "Login fail"
                });
            }
            return Ok(new
            {
                result.Username,
                result.Name,
            });
        }

        [HttpPut("{id}")]
        public IActionResult Update(string id, [FromBody] UpdateEndUser model)
        {
            var endUser = new EndUser()
            {
                Username = id,
                Password = model.Password,
                Name = model.Name,
                Email = model.Email,
                Phone = model.Phone,
                Address = model.Address,
            };

            try
            {
                endUser = _endUserService.Update(endUser);
                return Ok(new
                {
                    endUser.Username,
                    endUser.Name,
                    endUser.Email,
                    endUser.Phone,
                    endUser.Address
                });
            }
            catch (ApplicationException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterEndUser model) 
        {
            try
            {
                EndUser user = new EndUser
                {
                    Username = model.Username,
                    Password = model.Password,
                    Name = model.Name
                };
                _endUserService.Create(user);
                return Ok(new { message = "successfull" });
            }
            catch (ApplicationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
