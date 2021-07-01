using AiHcmCms.Dtos.Posts;
using AiHcmCms.Models;
using AiHcmCms.Models.Users;
using AiHcmCms.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
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
    public class PostController : Controller
    {
        private readonly PostService postService;
        private readonly UserService userService;
        private IHostingEnvironment hostingEnvironment;

        public PostController(PostService postService, UserService userService, IHostingEnvironment hostingEnvironment)
        {
            this.postService = postService;
            this.userService = userService;
            this.hostingEnvironment = hostingEnvironment;
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
                            url = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}" + path
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

        [HttpGet] 
        public IActionResult Get()
        {
            var posts = from p in postService.GetAll()
                        select new PostDTO
                        {
                            Id = p.Id,
                            Title = p.Title,
                            ImageCoverUrl = p.ImageCoverUrl,
                            Content = p.Content,
                            Description = p.Description,
                            AuthorName = p.Author.GetFullName(),
                            AtuhorAvatar = p.Author.Avatar,
                            AuthorId = p.Author.Id,
                            Created = p.Created,
                            Modified = p.Modified,
                            Published = p.Published,
                        };
            return Ok(posts);
        }

        [HttpGet("published")]
        public IActionResult GetPublished()
        {
            var posts = from p in postService.GetAll()
                        where p.Published = true
                        select new PostDTO
                        {
                            Id = p.Id,
                            Title = p.Title,
                            ImageCoverUrl = p.ImageCoverUrl,
                            Content = p.Content,
                            Description = p.Description,
                            AuthorName = p.Author.GetFullName(),
                            AtuhorAvatar = p.Author.Avatar,
                            AuthorId = p.Author.Id,
                            Created = p.Created,
                            Modified = p.Modified,
                            Published = p.Published,
                        };
            return Ok(posts);
        }

        [HttpPost]
        public IActionResult Post([FromBody] PostUpload model)
        {
            try
            {
                User author = userService.GetById(model.AuthorId);
                if (author != null)
                {
                    Post post = new Post
                    {
                        Title = model.Title,
                        ImageCoverUrl = model.ImageCoverUrl,
                        Content = model.Content,
                        Description = model.Description,
                        Created = model.Created,
                        Modified = model.Created,
                        Published = model.Published,
                        PublishedDate = model.PublishedDate,
                        Author = author,
                    };
                    postService.Create(post);
                    return Ok(post.Created);
                }
                else
                {
                    return BadRequest(new { message = "Author not found" });
                }
                
            }
            catch (ApplicationException ex)
            {
                return BadRequest(new { message = ex.Message });

            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] PostUpload model)
        {
            try
            {
                    Post post = new Post
                    {
                        Title = model.Title,
                        ImageCoverUrl = model.ImageCoverUrl,
                        Content = model.Content,
                        Description = model.Description,
                        Created = model.Created,
                        Modified = model.Created,
                        Published = model.Published,
                        PublishedDate = model.PublishedDate,
                        Id = id,
                    };
                    postService.Update(post);
                    return Ok("updated");
            }
            catch (ApplicationException ex)
            {
                return BadRequest(new { message = ex.Message });

            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            postService.Delete(id);
            return Ok();
        }
    }
}
