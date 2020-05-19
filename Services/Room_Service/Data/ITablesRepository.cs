using System.Collections.Generic;
using System.Threading.Tasks;
using Room_Service.Models;

namespace Room_Service.Data
{
    public interface ITablesRepository
    {
        Task<IEnumerable<PingPongTable>> GetAllTablesWithRoomId(int roomId);
        Task<IEnumerable<PingPongTable>> GetActiveTablesWithRoomId(int roomId);
        void AddTables(IEnumerable<PingPongTable> tables);
        Task<PingPongTable> GetTable(int tableId);
        void Remove(PingPongTable table);
        Task<bool> SaveAll();
    }
}