using AiHcmCms.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AiHcmCms.Services
{

    public interface IPostService
    {
        IEnumerable<Post> GetAll();
        Post GetById(int id);
        Post Create(Post post);
        Post Update(Post post);
        void Delete(int id);

    }
    public class PostService : IPostService
    {

        private static List<Post> posts = new List<Post>();
        private readonly UserService userService;
        private static int Count = 1;

        public PostService(UserService userService)
        {
            this.userService = userService;
            posts.Add(new Post
            {
                Id = Count ++,
                Author = userService.GetById(1),
                Title = "World's largest iceberg just broke off an Antarctic ice shelf",
                Description = "The floating mass is bigger than Rhode Island and covers an area more than 70 times that of Manhattan.",
                Content = "<p>By <a href='https://www.nbcnews.com/author/denise-chow-ncpn814621'>Denise Chow</a></p><p>An enormous chunk of ice bigger than Rhode Island has broken off an Antarctic ice shelf, according to the <a href='https://www.esa.int/ESA_Multimedia/Images/2021/05/Meet_the_world_s_largest_iceberg#.YKZMOIA48Kc.link'>European Space Agency</a>. The floating mass covers more than 1,600 square miles, making it the largest iceberg in the world, agency officials said.</p><p>The iceberg, dubbed A-76, calved off the Ronne Ice Shelf into the Weddell Sea. The European Space Agency's twin Copernicus Sentinel-1 satellites spotted the giant slab of ice breaking away on May 13.</p><p>The U.S. National Ice Center — which is operated by the National Oceanic and Atmospheric Administration, the Navy and the Coast Guard — confirmed the calving event the following day and recorded the position of A-76 in the Weddell Sea.</p><p>Iceberg A-76 calves from the western side of the Ronne Ice Shelf in the Weddell Sea and is currently the largest iceberg in the world the <a href='https://twitter.com/usnatice/status/1393289919397781508?s=20'>organization tweeted</a> Friday.</p><p>The finger-shaped iceberg is roughly 105 miles long and 15 miles wide, according to the European Space Agency. Its total area is more than 70 times that of Manhattan, New York.</p><p>It's not uncommon for an ice shelf to shed, and calving events occur naturally as these sprawling frozen platforms advance and contract. In recent decades, however, scientists have said climate change is causing worrisome changes across the Antarctic region. Global warming can, for instance, accelerate an ice shelf's retreat and cause it to collapse, according to the <a href='https://nsidc.org/cryosphere/quickfacts/iceshelves.html'>National Snow and Ice Data Center</a>.</p>",
                Created = 1621435449740,
                Modified = 1621435449740,
                ImageCoverUrl = "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-2000w,f_auto,q_auto:best/rockcms/2021-05/210520-iceberg-a-76-main-mn-1718-06c072.gif",
                Published = false,
            });
        }

        public Post Create(Post post)
        {
            post.Id = Count++;
            posts.Add(post);
            return post;
        }

        public void Delete(int id)
        {
            posts.RemoveAll(n => n.Id == id);
        }

        public IEnumerable<Post> GetAll()
        {
            return posts;
        }

        public Post GetById(int id)
        {
            return posts.Where(post => post.Id == id).FirstOrDefault();
        }

        public Post Update(Post post)
        {
            Post found = posts.Where(n => n.Id == post.Id).FirstOrDefault();
            if (found == null)
                throw new ApplicationException("Post not found");

            if (!string.IsNullOrEmpty(post.Title))
                found.Title = post.Title;

            if (!string.IsNullOrEmpty(post.Content))
                found.Content = post.Content;

            if (!string.IsNullOrEmpty(post.ImageCoverUrl))
                found.ImageCoverUrl = post.ImageCoverUrl;

            if (!string.IsNullOrEmpty(post.Description))
                found.Description = post.Description;

            if (post.Published != found.Published)
                found.Published = post.Published;

            found.Modified = post.Modified;

            return found;
        }
    }
}
