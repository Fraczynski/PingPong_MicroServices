using System.Collections.Generic;
using System.Threading.Tasks;
using Room_Service.Models;

namespace Room_Service.Data
{
    public interface IRoomsRepository
    {
        Task<List<Room>> GetAllRooms();
        Task<Room> GetRoom(int id);
        void Add(Room room);
        Task<bool> SaveAll();
        void Remove(Room room);
    }
}