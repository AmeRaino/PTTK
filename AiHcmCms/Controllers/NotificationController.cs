using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AiHcmCms.Dtos.Notifications;
using AiHcmCms.Dtos.Users;
using AiHcmCms.Hubs;
using AiHcmCms.Models.Notifications;
using AiHcmCms.Models.Users;
using AiHcmCms.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace AiHcmCms.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("MyPolicy")]
    public class NotificationController : ControllerBase
    {
        private readonly NotificationService notificationService;
        private readonly UserService userService;
        protected readonly IHubContext<NotificationHub> notificationHub;
        private IHostingEnvironment hostingEnvironment;
        public NotificationController(IHubContext<NotificationHub> notificationHub, 
            NotificationService notificationService, 
            UserService userService,
            IHostingEnvironment hostingEnvironment)
        {
            this.notificationService = notificationService;
            this.userService = userService;
            this.notificationHub = notificationHub;
            this.hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        public IEnumerable<Notification> Get()
        {
            return notificationService.GetAll();
        }

        [HttpGet("{idUser}/{idNotification}")]
        public IActionResult Get(int idUser,int idNotification)
        {
            var notification = notificationService.GetUserNotificationById(idUser, idNotification);
            return Ok(new UserNotificationDto() {
                IdRecipient = notification.Recipient.Id,
                IdNotification = notification.Notification.Id,
                Title = notification.Notification.Title,
                Body = notification.Notification.Body,
                Date = notification.Notification.Date,
                AuthorId = notification.Notification.Author.Id,
                AuthorName = notification.Notification.Author.FirstName + " " + notification.Notification.Author.LastName,
                AuthorAvatar = notification.Notification.Author.Avatar,
                IsRead = notification.IsRead
            });
        }

        [HttpGet("{idUser}")]
        public IActionResult GetUserNotification(int idUser)
        {
            var notifications = from noti in notificationService.GetUserNotifications(idUser)
                                orderby noti.Notification.Date descending
                                select new UserNotificationDto
                                {
                                    IdRecipient = idUser,
                                    IdNotification = noti.Notification.Id,
                                    Title = noti.Notification.Title,
                                    Body = noti.Notification.Body,
                                    OverView = noti.Notification.Body.Substring(0, noti.Notification.Body.Length <= 100 ? noti.Notification.Body.Length - 1 : 100) + (noti.Notification.Body.Length <= 100 ? "" : "..."),
                                    Date = noti.Notification.Date,
                                    AuthorId = noti.Notification.Author.Id,
                                    AuthorName = noti.Notification.Author.FirstName + " " + noti.Notification.Author.LastName,
                                    AuthorAvatar = noti.Notification.Author.Avatar,
                                    IsRead = noti.IsRead,
                                };
            
            return Ok(notifications);
        }

        [AllowAnonymous]
        [HttpPost("insert")]
        public async Task<IActionResult> Insert([FromBody]InsertNotification model)
        {

            await notificationHub.Clients.All.SendAsync("NewNotification", "Alo Alo" + model.Body);

            try
            {

                User author = userService.GetById(model.IdAuthor);

                // insert notification
                if (author != null)
                {
                    notificationService.Create(new Notification
                    {
                        Author = author,
                        Body = model.Body,
                        Title = model.Title,
                        Date = model.Date
                    });
                }
                else
                {
                    return BadRequest(new { message = "Lỗi! User không tồn tại" });
                }
                
                return Ok();
            }
            catch (ApplicationException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("marknotification")] 
        public IActionResult MarkNotification([FromBody]MarkNotification model)
        {
            notificationService.MarkNotification(model.IdUser, model.IdNotification, model.IsRead);
            return Ok();
        }
    }
}