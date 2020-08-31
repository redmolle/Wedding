using DbRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DbRepository.Repositories
{
    public class DishRepository : Repository, IDishRepository
    {
        public DishRepository(AppSettings settings, IRepositoryContextFactory contextFactory)
            : base(settings, contextFactory) { }

        public async Task<IEnumerable<Dish>> GetDishes()
        {
            using (var context = CreateDbContext())
            {
                return await context.Dish.ToListAsync();
            }
        }
    }
}
