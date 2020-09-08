using Microsoft.EntityFrameworkCore.Internal;
using System.Linq;
using WeddingApp.Models;

namespace WeddingApp.Data
{
    public static class DbInitializer
    {
        public static void Initialize(WeddingContext context, AppSettings app)
        {
            if (context.Guest.Any())
            {
                return;
            }

            context.Category.AddRange(app.Categories);
            context.SaveChanges();
            var categories = context.Category.ToList();

            context.Dish.AddRange(app.Dishes.Select(d => new Dish()
            {
                Name = d.Name,
                CategoryId = categories.First(c => c.Name == d.Category.Name).Id,
            }));
            context.SaveChanges();
            var dishes = context.Dish.ToList();

            context.Guest.AddRange(app.Guests);
            context.SaveChanges();
            var guests = context.Guest.ToList();

            foreach (var guest in guests)
            {
                context.Meal.AddRange(dishes.Select(d => new Meal()
                {
                    GuestId = guest.Id,
                    DishId = d.Id,
                }));
            }
            context.SaveChanges();
        }
    }
}
