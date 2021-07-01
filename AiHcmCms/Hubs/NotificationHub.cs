using AiHcmCms.Models.Notifications;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AiHcmCms.Hubs
{
    public class NotificationHub : Hub
    {
        public async Task SendMessage(Notification notification)
        {
            await Clients.All.SendAsync("ReceiveNotification", notification);
        }
    }
}
