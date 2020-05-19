using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Room_Service.Models;

namespace Room_Service.Data
{
    public class TablesRepository : ITablesRepository
    {
        private readonly DataContext _context;
        public TablesRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<PingPongTable>> GetAllTablesWithRoomId(int roomId)
        {
            return await _context.Tables.Where(t => (t.RoomId == roomId)).ToListAsync();
        }
        public async Task<IEnumerable<PingPongTable>> GetActiveTablesWithRoomId(int roomId)
        {
            return await _context.Tables.Where(t => (t.RoomId == roomId && t.Active == true)).ToListAsync();
        }
        public void AddTables(IEnumerable<PingPongTable> tables)
        {
            _context.Tables.AddRange(tables);
        }
        public async Task<PingPongTable> GetTable(int tableId)
        {
            return await _context.Tables.FirstOrDefaultAsync(t => t.Id == tableId);
        }
        public void Remove(PingPongTable table)
        {
            _context.Tables.Remove(table);
        }
        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}