using AiHcmCms.Models.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AiHcmCms.Models.Documents
{
    public class Document
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public long Created { get; set; }
        public long Modified { get; set; }
        public User Author { get; set; }
    }
}
