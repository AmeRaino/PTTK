using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AiHcmCms.Dtos.Notifications
{
    public class UserNotificationDto
    {
        public int IdRecipient { get; set; }
        public int IdNotification { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public long Date { get; set; }
        public string OverView { get; set; }
        public string AuthorName { get; set; }
        public int AuthorId { get; set; }
        public string AuthorAvatar { get; set; }
        public bool IsRead { get; set; }
    }
}
