using AiHcmCms.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AiHcmCms.Services
{

    public interface IDocumentService
    {
        IEnumerable<Document> GetAll();
        Document GetById(int id);
        Document Create(Document document);
        void Update(Document document);
        void Delete(int id);
    }

    public class DocumentService : IDocumentService
    {
        private static List<Document> documents = new List<Document>();
        private readonly UserService userService;
        private static int Count = 1;

        public DocumentService(UserService userService)
        {
            this.userService = userService;
            documents.Add(new Document
            {
                Id = Count++,
                Author = userService.GetById(1),
                Title = "Tài liệu học tập",
                Created = 1620138072983,
                Modified = 1620138072983,
                Url = "",
            });

            documents.Add(new Document
            {
                Id = Count++,
                Author = userService.GetById(1),
                Title = "Tài liệu học tập (150GB)",
                Created = 1620138072983,
                Modified = 1620138072983,
                Url = "",
            });

        }

        public void Delete(int id)
        {
            documents.RemoveAll(n => n.Id == id);
        }

        public IEnumerable<Document> GetAll()
        {
            return documents;
        }

        public Document GetById(int id)
        {
            return documents.Where(x => x.Id == id).FirstOrDefault();
        }

        public Document Create(Document document)
        {
            document.Id = Count++;
            documents.Add(document);
            return document;
        }

        public void Update(Document document)
        {
            throw new NotImplementedException();
        }
    }
}
