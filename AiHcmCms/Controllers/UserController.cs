using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using AiHcmCms.Dtos.Users;
using AiHcmCms.Models.Users;
using AiHcmCms.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace AiHcmCms.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("MyPolicy")]
    public class UserController : Controller
    {
        private readonly UserService userService;
        private IHostingEnvironment hostingEnvironment;
        public UserController(UserService userService, IHostingEnvironment hostingEnvironment)
        {
            this.userService = userService;
            this.hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var users = from u in userService.GetAll()
                        select new UserDTO
                        {
                            Id = u.Id,
                            FirstName = u.FirstName,
                            LastName = u.LastName,
                            Username = u.Username,
                            Role = u.Role,
                            CreatedDate = u.CreatedDate,
                            Email = u.Email,
                            Phone = u.Phone,
                            Avatar = u.Avatar,
                        };
            return Ok(users);
        }

        // GET api/users/5
        //[HttpGet("{id}")]
        //public IActionResult GetById(int id)
        //{
        //    return Ok(userService.GetById(id));
        //}

        [HttpGet("{getroles}")]
        public IActionResult Get(int id)
        {
            return Ok(userService.GetUserRoles());
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] AuthenticateUser model)
        {
            User user = userService.Authenticate(model.Username, model.Password);
            if (user == null)
                return StatusCode(500, new
                {
                    message = "Đăng nhập thất bại",
                    details = "Sai tên truy cập hoặc mật khẩu",
                });
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("This is a secret secret secret secret secret key for autheticationnnnnnnnnnnn");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new
            {
                user.Id,
                user.Username,
                user.FirstName,
                user.LastName,
                user.CreatedDate,
                user.Email,
                user.Phone,
                user.Role,
                user.Avatar,
                Token = tokenString
            });
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterUser model)
        {
            try
            {
                User user = new User
                {
                    Username = model.UserName,
                    Password = model.Password,
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    Email = model.Email,
                    Phone = model.Phone,
                    CreatedDate = model.CreatedDate,
                    Role = userService.GetRole(model.IdRole)
                };

                // create user
                userService.Create(user);
                return Ok();
            }
            catch (ApplicationException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] UpdateUser model)
        {
            var user = new User()
            {
                Id = id,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Password = model.Password,
                Role = userService.GetRole(model.IdRole),
                Email = model.Email,
                Phone = model.Phone,
                Avatar = model.Avatar
            };

            try
            {
                user = userService.Update(user);
                return Ok(new
                {
                    user.Id,
                    user.Username,
                    user.FirstName,
                    user.LastName,
                    user.CreatedDate,
                    user.Email,
                    user.Phone,
                    user.Role,
                    user.Avatar,
                    model.Token
                });
            }
            catch (ApplicationException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            userService.Delete(id);
            return Ok();
        }

        [HttpPost("updateavatar/{id}")]//api/user/upda/2
        public async Task<IActionResult> UpdateAvatar(int id, [FromForm] AvatarUpload objFile)
        {
            try
            {
                if (objFile.Files.Length > 0)
                {
                    if (!Directory.Exists(hostingEnvironment.WebRootPath + "\\Upload\\"))
                    {
                        Directory.CreateDirectory(hostingEnvironment.WebRootPath + "\\Uploads\\");
                    }
                    var path = "\\Uploads\\" + "avt_" + id.ToString() + objFile.Files.FileName;
                    using (FileStream fileStream = System.IO.File.Create(hostingEnvironment.WebRootPath + path))
                    {
                        objFile.Files.CopyTo(fileStream);
                        fileStream.Flush();

                        userService.updateAvatar(id, $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}" + path);
                        return Ok($"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}" + path);
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

        public override NoContentResult NoContent()
        {
            return base.NoContent();
        }
    }
}