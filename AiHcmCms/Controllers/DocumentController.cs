using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AiHcmCms.Dtos.Documents;
using AiHcmCms.Models.Documents;
using AiHcmCms.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AiHcmCms.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("MyPolicy")]
    public class DocumentController : Controller
    {
        private readonly DocumentService documentService;
        private readonly UserService userService;
        private IHostingEnvironment hostingEnvironment;

        public DocumentController(DocumentService documentService, IHostingEnvironment hostingEnvironment, UserService userService)
        {
            this.documentService = documentService;
            this.hostingEnvironment = hostingEnvironment;
            this.userService = userService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var documents = from doc in documentService.GetAll()
                            select new DocumentDTO
                            {
                                AuthorName = doc.Author.GetFullName(),
                                Modified = doc.Modified,
                                Title = doc.Title,
                                Url = doc.Url
                            };
            return Ok(documents);
        }

        [HttpDelete("{id}")] //api/document/1
        public IActionResult Delete(int id)
        {
            documentService.Delete(id);
            return Ok();
        }

        [HttpPost("{idAuthor}")]
        public async Task<IActionResult> Post(int idAuthor, [FromForm]FormPostDocument formPostDocument)
        {
            try
            {
                if (formPostDocument.Files.Length > 0)
                {
                    if (!Directory.Exists(hostingEnvironment.WebRootPath + "\\Upload\\"))
                    {
                        Directory.CreateDirectory(hostingEnvironment.WebRootPath + "\\Uploads\\");
                    }
                    var path = "\\Uploads\\" + "doc_" + DateTime.UtcNow.Date.ToString("yyyyMMddHHmmss") + formPostDocument.Files.FileName;
                    using (FileStream fileStream = System.IO.File.Create(hostingEnvironment.WebRootPath + path))
                    {
                        formPostDocument.Files.CopyTo(fileStream);
                        fileStream.Flush();
                    }

                    Document doc = new Document
                    {
                        Author = userService.GetById(idAuthor),
                        Created = formPostDocument.Created,
                        Modified = formPostDocument.Created,
                        Title = formPostDocument.Title,
                        Url = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}" + path,
                    };
                    documentService.Create(doc);
                    return Ok($"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}" + path);

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
    }
}