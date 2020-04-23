using OpeningHours_Service.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace OpeningHours_Service.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> contextOptions) : base(contextOptions)
        {

        }
        public DbSet<OpeningHours> OpeningHours { get; set; }
        public DbSet<SpecialOpeningHours> SpecialOpeningHours { get; set; }
    }
}
