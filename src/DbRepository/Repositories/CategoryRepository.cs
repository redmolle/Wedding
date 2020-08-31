using DbRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbRepository.Repositories
{
    public class CategoryRepository : Repository, ICategoryRepository
    {
        public CategoryRepository(AppSettings settings, IRepositoryContextFactory contextFactory)
            : base(settings, contextFactory) { }

        public async Task<IEnumerable<Category>> GetCategories()
        {
            using (var context = CreateDbContext())
            {
                return await context.Category.ToListAsync();
            }
        }
    }
}
