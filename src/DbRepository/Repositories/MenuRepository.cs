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
    public class MenuRepository : BaseRepository, IMenuRepository
    {
        public MenuRepository(AppSettings settings, IRepositoryContextFactory contextFactory)
            : base(settings, contextFactory) { }

        public async Task<bool> Choose(Guid id)
        {
            using (var context = this.CreateDbContext())
            {
                var menuItem = await context.Menu.SingleOrDefaultAsync(m => m.Id == id);
                if (menuItem == null)
                {
                    return false;
                }
                menuItem.IsChoosed = !menuItem.IsChoosed;
                await context.SaveChangesAsync();

                return true;
            }
        }
    }
}
