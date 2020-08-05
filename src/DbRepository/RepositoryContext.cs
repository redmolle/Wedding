using Microsoft.EntityFrameworkCore;
using Models;
using System;

namespace DbRepository
{
    public class RepositoryContext : DbContext
    {
        public RepositoryContext(DbContextOptions<RepositoryContext> options)
            : base(options) { }

        public DbSet<Guest> Guest { get; set; }

        public DbSet<MenuItem> Menu { get; set; }

        public DbSet<Item> Item { get; set; }

        public DbSet<Category> Category { get; set; }
    }
}
