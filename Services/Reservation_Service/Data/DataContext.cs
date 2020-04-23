using Reservation_Service.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Reservation_Service.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> contextOptions) : base(contextOptions)
        {

        }
        public DbSet<PingPongTable> Tables { get; set; }
        public DbSet<Alert> Alerts { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<OpeningHours> OpeningHours { get; set; }
        public DbSet<SpecialOpeningHours> SpecialOpeningHours { get; set; }
        public DbSet<ClosingDay> ClosingDays { get; set; }
        public DbSet<Photo> Photos { get; set; }

    }
}
