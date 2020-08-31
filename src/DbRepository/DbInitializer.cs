using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbRepository
{
    public class DbInitializer
    {
        public static async Task Initialize(RepositoryContext context, AppSettings appSettings)
        {
            await context.Database.MigrateAsync();

            var categories = await context.Category.ToListAsync();

            appSettings.Categories.ForEach(category =>
            {
                if (!categories.Any(c => c.Name == category.Name))
                {
                    context.Category.Add(category);
                }
            });
            await context.SaveChangesAsync();

            categories = await context.Category.ToListAsync();

            var dishes = await context.Dish.ToListAsync();

            appSettings.Dishes.ForEach(dish =>
            {
                if (!dishes.Any(d => d.Name == dish.Name))
                {
                    context.Dish.Add(new Dish
                    {
                        Name = dish.Name,
                        CategoryId = categories.First(c => c.Name == dish.Category.Name).Id
                    });
                }
            });
            await context.SaveChangesAsync();

            dishes = await context.Dish.ToListAsync();

            var guests = await context.Guest.ToListAsync();

            appSettings.Guests.ForEach(guest =>
            {
                if (!guests.Any(g => g.Name == guest.Name))
                {
                    context.Guest.Add(guest);
                }
            });
            await context.SaveChangesAsync();

            guests = await context.Guest.ToListAsync();

            var meals = await context.Meal.ToListAsync();

            guests.ForEach(g =>
            {
                dishes.ForEach(d =>
                {
                    if (!meals.Any(m => m.GuestId == g.Id && m.DishId == d.Id))
                    {
                        context.Meal.Add(new Meal
                        {
                            GuestId = g.Id,
                            DishId = d.Id,
                        }); ;
                    }
                });
            });
            await context.SaveChangesAsync();
        }
    }
}
