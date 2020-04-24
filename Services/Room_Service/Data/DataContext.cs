using Microsoft.EntityFrameworkCore;
using Room_Service.Models;

namespace Room_Service.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> contextOptions) : base(contextOptions)
        {

        }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<PingPongTable> Tables { get; set; }
    }
}