using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AiHcmCms.Dtos.Posts
{
    public class ImageUpload
    {
        public IFormFile upload { get; set; }
    }
}
