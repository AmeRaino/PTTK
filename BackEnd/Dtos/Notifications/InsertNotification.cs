using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AiHcmCms.Models.Notifications
{
    public class InsertNotification
    {
        public int IdAuthor { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public long Date { get; set; }
    }
}
