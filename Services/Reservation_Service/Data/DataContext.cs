using Microsoft.EntityFrameworkCore;
using Reservation_Service.Models;

namespace Reservation_Service.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> contextOptions) : base(contextOptions)
        {

        }
        public DbSet<Reservation> Reservations { get; set; }
    }
}