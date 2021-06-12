using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AiHcmCms.Dtos.Documents
{
    public class DocumentDTO
    {  
        public string Title { get; set; }
        public string Url { get; set; }
        public long Modified { get; set; }
        public string AuthorName { get; set; }
    }
}
