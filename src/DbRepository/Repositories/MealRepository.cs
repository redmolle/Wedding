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
    public class MealRepository : Repository, IMealRepository
    {
        public MealRepository(AppSettings settings, IRepositoryContextFactory contextFactory)
            : base(settings, contextFactory) { }

        public async Task CreateMeal(Meal meal)
        {
            using (var context = CreateDbContext())
            {
                context.Meal.Add(meal);
                await context.SaveChangesAsync();
            }
        }

        public async Task DeleteMeal(Guid id)
        {
            using (var context = CreateDbContext())
            {
                var meal = await context.Meal.FindAsync(id);
                context.Meal.Remove(meal);
                await context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Meal>> GetMeals(Guid id)
        {
            using (var context = CreateDbContext())
            {
                return await context.Meal.Where(m => m.GuestId == id).ToListAsync();
            }
        }
    }
}
