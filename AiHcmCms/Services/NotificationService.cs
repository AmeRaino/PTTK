using AiHcmCms.Models;
using AiHcmCms.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AiHcmCms.Services
{

    public interface INotificationService
    {
        IEnumerable<Notification> GetAll();
        Notification GetById(int id);
        Notification Create(Notification notification);
        void Update(Notification notification);
        void Delete(int id);
    }

    public class NotificationService : INotificationService
    {
        private static List<Notification> notifications = new List<Notification>();
        private static List<UserNotification> userNotifications = new List<UserNotification>();
        private readonly UserService userService;
        private static int Count = 1;
        public NotificationService(UserService userService)
        {
            this.userService = userService;
            notifications.Add(new Notification
            {
                Id = Count++,
                Author = userService.GetById(1),
                Title = "How to Set Goals and Drive Sales by Email Marketing Automation",
                Body = "With email marketing garnering the highest return on investment, it has emerged as the highest performing marketing channel. This is the reason that a lot of e-commerce marketers are making extensive use of email marketing for being successful in the long run of business. However, with such immense competition, it becomes imperative for marketers to choose an email marketing strategy that can help them attract customers and have an edge over competitors. This is where email marketing automation can come in handy. In fact, according to Econsultancy and Adestra, 53% of marketers use email marketing automation for enabling one to one communication with their customers.",
                Date = 1620138072983,
            });
            notifications.Add(new Notification
            {
                Id = Count++,
                Author = userService.GetById(1),
                Title = "QA, QC, ISO Công Ty TNHH CCL Design Vina",
                Body = "<p><span style='color:rgba(0, 0, 0, 0.87); '>- Understand the manufacturing process, product characteristics and requirements.</span></p><p><span style='color: rgba(0, 0, 0, 0.87); '>&nbsp;- Coordinate with the warehouse and production department to check the quality of input raw material.&nbsp;</span></p><p><span style='color: rgba(0, 0, 0, 0.87); '>- Supervise and inspect the quality of product at the production line according to standards and process, ensure that the quality of product before storing and delivery to customer.&nbsp;</span></p><p><span style='color: rgba(0, 0, 0, 0.87); '>- Update information during inspection process according form for each product, update quality manual.&nbsp;</span></p><p><span style='color: rgba(0, 0, 0, 0.87); '>- Coordinate with relevant departments to handle non-conformities problem, issue action plan to prevent and correct.&nbsp;</span></p><p><span style='color: rgba(0, 0, 0, 0.87); '>- Maintain the quality system.&nbsp;</span></p><p><span style='color: rgba(0, 0, 0, 0.87); '>- Annual internal assessment for quality management system of the company, thereby adjusting and changing the process accordingly. Prepare quality report.&nbsp;</span></p><p><span style='color: rgba(0, 0, 0, 0.87); '>- Other jobs related EHS, ISO. - Other related jobs, will be discussed during the interview.</span></p>",
                Date = 1620138072983,
            });

            foreach (User user in userService.GetAll())
            {
                foreach(Notification notification in notifications)
                {
                    userNotifications.Add(new UserNotification
                    {
                        Recipient = user,
                        Notification = notification,
                        IsRead = false,
                    });
                }
            }
        }

        //private static NotificationService _instance;

        //public static NotificationService GetInstance()
        //{
        //    if (_instance == null)
        //    {
        //        _instance = new NotificationService();
        //    }
        //    return _instance;
        //}

        public IEnumerable<UserNotification> GetUserNotifications(int idUser)
        {
            return userNotifications.Where(x => x.Recipient.Id == idUser);
        }

        public UserNotification GetUserNotificationById(int idUser, int idNotification)
        {
            return userNotifications.Where(x => x.Recipient.Id == idUser && x.Notification.Id == idNotification)
                .FirstOrDefault();
        }

        public IEnumerable<Notification> GetAll()
        {
            return notifications;
        }

        public Notification GetById(int id)
        {
            return notifications.Where(x => x.Id == id).FirstOrDefault();
        }

        public Notification Create(Notification notification)
        {
            notification.Id = Count++;
            notifications.Add(notification);

            foreach (User user in userService.GetAll())
            {
                userNotifications.Add(new UserNotification
                {
                    Recipient = user,
                    Notification = notification,
                    IsRead = false
                });
            }
            return notification;
        }

        public void Update(Notification notification)
        {
            throw new NotImplementedException();
        }

        public void MarkNotification(int idRecipient, int idNotification, Boolean value)
        {
            userNotifications.Where(
                x => x.Recipient.Id == idRecipient 
                && x.Notification.Id == idNotification)
                .FirstOrDefault()
                .MarkAs(value);
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}
