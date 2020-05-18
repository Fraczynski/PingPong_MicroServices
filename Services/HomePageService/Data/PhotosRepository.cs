using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using HomePageService.Models;

namespace HomePageService.Data
{
    public class PhotosRepository : IPhotosRepository
    {
        private readonly DataContext _context;
        public PhotosRepository(DataContext context)
        {
            _context = context;

        }
        public void AddPhoto(Photo photo)
        {
            _context.Photos.Add(photo);
        }

        public async Task<Photo> GetPhoto(int id)
        {
            return await _context.Photos.FirstOrDefaultAsync(p=>p.Id==id);
        }

        public async Task<IEnumerable<Photo>> GetPhotos()
        {
           return await _context.Photos.ToListAsync();
        }

        public void RemovePhoto(Photo photo)
        {
            _context.Remove(photo);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync()>0;
        }
    }
}