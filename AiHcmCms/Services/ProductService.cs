using AiHcmCms.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AiHcmCms.Services
{
    public interface IProductService
    {
        IEnumerable<Cake> GetAll();
        Cake GetById(int id);
        Cake Create(Cake cake);
        Cake Update(Cake cake);
        Cake UpdateAmount(Cake cake);
        void Delete(int id);
    }
    public class ProductService : IProductService
    {

        private static List<Cake> cakes = new List<Cake>();
        private static List<Category> categories = new List<Category>();
        private static int Count = 1;
        private String baseImgUrl = "";
        public ProductService()
        {
            categories.Add(new Category
            {
                ID = 1,
                Name = "Donut"
            });
            categories.Add(new Category
            {
                ID = 2,
                Name = "Cookie"
            });
            categories.Add(new Category
            {
                ID = 3,
                Name = "Birthday"
            });

            cakes.Add(new Cake
            {
                ID = Count++,
                Name = "Donut Pink Cream",
                Category = GetCategoryByID(1),
                Discount = 0,
                Price = 1.2f,
                Amount = 10,
                Avatar = baseImgUrl + "_donut.png"

            });

            cakes.Add(new Cake
            {
                ID = Count++,
                Name = "Donut blue berry",
                Category = GetCategoryByID(1),
                Discount = 0,
                Price = 12.2f,
                Amount = 10,
                Avatar = baseImgUrl + "_donut_4.png"

            });

            cakes.Add(new Cake
            {
                ID = Count++,
                Name = "Dooonut white coconut",
                Category = GetCategoryByID(1),
                Discount = 0,
                Price = 11.2f,
                Amount = 10,
                Avatar = baseImgUrl + "_donut_pinkcr.png"

            });

            cakes.Add(new Cake
            {
                ID = Count++,
                Name = "Dooonut White Cream",
                Category = GetCategoryByID(1),
                Discount = 0,
                Price = 1.6f,
                Amount = 10,
                Avatar = baseImgUrl + "_donut_whitecr.png"

            });





            cakes.Add(new Cake
            {
                ID = Count++,
                Name = "Cookie Chocolate",
                Category = GetCategoryByID(2),
                Discount = 0,
                Price = 1.2f,
                Amount = 10,
                Avatar = baseImgUrl + "_cookie.jpg"

            });

            cakes.Add(new Cake
            {
                ID = Count++,
                Name = "Cookie Blue heart",
                Category = GetCategoryByID(2),
                Discount = 0,
                Price = 12.2f,
                Amount = 10,
                Avatar = baseImgUrl + "_cookie2.jpg"

            });

            cakes.Add(new Cake
            {
                ID = Count++,
                Name = "Cookie Standard",
                Category = GetCategoryByID(2),
                Discount = 0,
                Price = 12.2f,
                Amount = 10,
                Avatar = baseImgUrl + "_cookie3.jpg"

            });

            cakes.Add(new Cake
            {
                ID = Count++,
                Name = "Cookie Chocolate White",
                Category = GetCategoryByID(2),
                Discount = 0,
                Price = 12.2f,
                Amount = 10,
                Avatar = baseImgUrl + "_cookie4.jpg"

            });




            cakes.Add(new Cake
            {
                ID = Count++,
                Name = "Birthday Basic",
                Category = GetCategoryByID(3),
                Discount = 0,
                Price = 1.2f,
                Amount = 10,
                Avatar = baseImgUrl + "_birthday.jpg"

            });

            cakes.Add(new Cake
            {
                ID = Count++,
                Name = "Birthday Special",
                Category = GetCategoryByID(3),
                Discount = 0,
                Price = 1.2f,
                Amount = 10,
                Avatar = baseImgUrl + "_birthday3.jpg"

            });

            cakes.Add(new Cake
            {
                ID = Count++,
                Name = "Birthday Chocolate",
                Category = GetCategoryByID(3),
                Discount = 0,
                Price = 1.2f,
                Amount = 10,
                Avatar = baseImgUrl + "_birthday4.jpg"

            });

            cakes.Add(new Cake
            {
                ID = Count++,
                Name = "Birthday Brown Berry",
                Category = GetCategoryByID(3),
                Discount = 0,
                Price = 1.2f,
                Amount = 10,
                Avatar = baseImgUrl + "_birthday1.jpg"

            });

        }
        //private static UserService _instance;

        //public static UserService GetInstance()
        //{
        //    if (_instance == null)
        //    {
        //        _instance = new UserService();
        //    }
        //    return _instance;
        //}
        public Category GetCategoryByID(int id)
        {
            return categories.Where(x => x.ID == id).FirstOrDefault();
        }

        public IEnumerable<Category> GetCategories()
        {
            return ((IEnumerable<Category>)categories).ToList();
        }

        public Cake Create(Cake cake)
        {
            cake.ID = Count++;
            cakes.Add(cake);
            return cake;
        }

        public void Delete(int id)
        {
            cakes.RemoveAll(n => n.ID == id);
        }

        public IEnumerable<Cake> GetAll()
        {
            return ((IEnumerable<Cake>)cakes).ToList();
        }

        public Cake GetById(int id)
        {
            return cakes.Where(cake => cake.ID == id).FirstOrDefault();
        }

        public Cake Update(Cake cake)
        {
            Cake found = cakes.Where(n => n.ID == cake.ID).FirstOrDefault();
            if (found == null)
                throw new ApplicationException("User not found");

            //if (!string.IsNullOrWhiteSpace(user.Username) && user.Username != found.Username)
            //    found.Username = user.Username;

            if (!string.IsNullOrEmpty(cake.Name))
                found.Name = cake.Name;

            if (cake.Price > 0)
                found.Price = cake.Price;

            if (cake.Discount > -1)
                found.Discount = cake.Discount;

            if (cake.Amount > -1)
                found.Amount = cake.Amount;

            if (cake.Category != null)
                found.Category = cake.Category;

            if (!string.IsNullOrWhiteSpace(cake.Avatar))
                found.Avatar = cake.Avatar;

            return found;
        }

        public Cake UpdateAmount(Cake cake)
        {
            Cake found = cakes.Where(n => n.ID == cake.ID).FirstOrDefault();
            if (found == null)
                throw new ApplicationException("User not found");

            //if (!string.IsNullOrWhiteSpace(user.Username) && user.Username != found.Username)
            //    found.Username = user.Username;

            if (cake.Amount > -1)
                found.Amount = found.Amount - cake.Amount;

            return found;
        }

        public void updateAvatar(int id, string avatarPath)
        {
            Cake found = cakes.Where(n => n.ID == id).FirstOrDefault();
            if (found == null)
                throw new ApplicationException("User not found");

            found.Avatar = avatarPath;
        }
    }
}
