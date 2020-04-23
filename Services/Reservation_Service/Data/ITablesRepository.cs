using System.Collections.Generic;
using System.Threading.Tasks;
using Reservation_Service.Models;

namespace Reservation_Service.Data
{
    public interface ITablesRepository
    {
        Task<IEnumerable<PingPongTable>> GetAllTablesWithRoomId(int roomId);
        void AddTables(IEnumerable<PingPongTable> tables);
        Task<PingPongTable> GetTable(int tableId);
        void Remove(PingPongTable table);
        Task<bool> SaveAll();
    }
}