using Microsoft.EntityFrameworkCore;
using WeddingApp.Models;

namespace WeddingApp.Data
{
    public class WeddingContext : DbContext
    {
        public WeddingContext(DbContextOptions<WeddingContext> options) : base(options)
        {

        }

        public DbSet<Category> Category { get; set; }

        public DbSet<Dish> Dish { get; set; }

        public DbSet<Meal> Meal { get; set; }

        public DbSet<Guest> Guest { get; set; }
    }
}
