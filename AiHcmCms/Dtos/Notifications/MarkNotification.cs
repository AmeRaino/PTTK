using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AiHcmCms.Dtos.Notifications
{
    public class MarkNotification
    {
        public int IdUser { get; set; }
        public int IdNotification { get; set; }
        public bool IsRead { get; set; }
    }
}
