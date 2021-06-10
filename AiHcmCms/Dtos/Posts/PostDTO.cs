using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AiHcmCms.Dtos.Posts
{
    public class PostDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string ImageCoverUrl { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public string AuthorName { get; set; }
        public string AtuhorAvatar { get; set; }
        public int AuthorId { get; set; }
        public long Created { get; set; }
        public long Modified { get; set; }
        public bool Published { get; set; }
        public long PublishedDate { get; set; }
    }
}
