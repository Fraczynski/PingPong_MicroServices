using HomePageService.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace HomePageService.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> contextOptions) : base(contextOptions)
        {

        }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Alert> Alerts { get; set; }
        public DbSet<TextFieldContent> TextFieldContents { get; set; }
    }
}