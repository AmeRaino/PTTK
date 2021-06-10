using AiHcmCms.Models.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AiHcmCms.Models.Notifications
{
    public class UserNotification
    {
        public User Recipient {get;set;}
        public Notification Notification { get; set; }
        public Boolean IsRead { get; set; }

        public void MarkAs(Boolean value)
        {
            this.IsRead = value;
        }
    }
}
