using AiHcmCms.Models.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AiHcmCms.Models.Notifications
{
    public class Notification
    {
        public int Id { get; set; }
        public User Author { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public long Date { get; set; }
    }
}
