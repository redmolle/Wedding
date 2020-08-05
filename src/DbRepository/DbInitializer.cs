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

            if (!await context.Guest.AnyAsync())
            {
                await context.Category.ForEachAsync(c => context.Category.Remove(c));
                appSettings.Categories.ForEach(c => context.Category.Add(c));
                await context.SaveChangesAsync();

                var randomCategory = await context.Category.FirstOrDefaultAsync();

                await context.Item.ForEachAsync(i => context.Item.Remove(i));
                appSettings.Items.ForEach(i =>
                {
                    i.Category = randomCategory;
                    context.Item.Add(i);
                });
                await context.SaveChangesAsync();

                await context.Guest.ForEachAsync(g => context.Guest.Remove(g));
                appSettings.Persons.ForEach(g => context.Guest.Add(g));
                await context.SaveChangesAsync();

                await context.Menu.ForEachAsync(m => context.Menu.Remove(m));
                var guestList = await context.Guest.ToListAsync();
                var itemList = await context.Item.ToListAsync();
                foreach (var guest in guestList)
                {
                    foreach (var item in itemList)
                    {
                        context.Menu.Add(new MenuItem
                        {
                            GuestId = guest.Id,
                            ItemId = item.Id,
                            IsChoosed = false,
                        });
                    }
                }
                await context.SaveChangesAsync();
            }
        }
    }
}
