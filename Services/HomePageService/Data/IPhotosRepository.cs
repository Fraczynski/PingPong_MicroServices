using System.Collections.Generic;
using System.Threading.Tasks;
using HomePageService.Models;

namespace HomePageService.Data
{
    public interface IPhotosRepository
    {
        Task<IEnumerable<Photo>> GetPhotos();
        void AddPhoto(Photo photo);
        void RemovePhoto(Photo photo);
        Task<Photo> GetPhoto(int id);
        Task<bool> SaveAll();
    }
}