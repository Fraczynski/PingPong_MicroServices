using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Room_Service.Models;

namespace Room_Service.Data
{
    public class RoomsRepository : IRoomsRepository
    {
        private readonly DataContext _context;
        public RoomsRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<List<Room>> GetAllRooms()
        {
            return await _context.Rooms.ToListAsync();
        }
        public void Add(Room room)
        {
            _context.Add(room);
        }
        public async Task<Room> GetRoom(int id)
        {
            return await _context.Rooms.FirstOrDefaultAsync(r => r.Id == id);
        }
        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
        public void Remove(Room room)
        {
            _context.Rooms.Remove(room);
        }
    }
}