using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AiHcmCms.Dtos.Documents
{
    public class FormPostDocument
    {
        public string Title { get; set; }
        public IFormFile Files { get; set; }
        public long Created { get; set; }
        public int IdAuthor { get; set; }
    }
}
