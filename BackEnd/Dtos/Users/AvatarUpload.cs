using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AiHcmCms.Dtos.Users
{
    public class AvatarUpload
    {
        public IFormFile Files { get; set; }
    }
}
