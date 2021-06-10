﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AiHcmCms.Dtos.Posts
{
    public class PostUpload
    {
        public int AuthorId { get; set; }
        public string Title { get; set; }
        public string ImageCoverUrl { get; set; }
        public string Content { get; set; }
        public string Description { get; set; }
        public long Created { get; set; }
        public bool Published { get; set; }
        public long PublishedDate { get; set; }

    }
}
