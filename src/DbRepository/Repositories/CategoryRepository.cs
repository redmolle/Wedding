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
    public class CategoryRepository : BaseRepository, ICategoryRepository
    {
        public CategoryRepository(AppSettings settings, IRepositoryContextFactory contextFactory)
            : base(settings, contextFactory) { }

        public async Task<IEnumerable<Category>> GetAll()
        {
            using (var context = this.CreateDbContext())
            {
                return await context.Category.OrderBy(o => o.SortOrder).ToListAsync();
            }
        }
    }
}
