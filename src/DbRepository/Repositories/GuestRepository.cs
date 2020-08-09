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
    public class GuestRepository : BaseRepository, IGuestRepository
    {
        public GuestRepository(AppSettings settings, IRepositoryContextFactory contextFactory)
            : base(settings, contextFactory) { }

        public async Task<bool> ConfirmInvite(Guid id, bool? isConfirmed)
        {
            using (var context = CreateDbContext())
            {
                var guest = await context.Guest.SingleOrDefaultAsync(g => g.Id == id);
                if (guest == null)
                {
                    return false;
                }
                guest.IsConfirmed = isConfirmed ?? !guest.IsConfirmed;
                await context.SaveChangesAsync();
                return true;
            }
        }

        public async Task<bool> ConfirmZAGS(Guid id, bool? isConfirmed)
        {
            using (var context = CreateDbContext())
            {
                var guest = await context.Guest.SingleOrDefaultAsync(g => g.Id == id);
                if (guest == null)
                {
                    return false;
                }
                guest.IsConfirmedZAGS = isConfirmed ?? !guest.IsConfirmed;
                await context.SaveChangesAsync();
                return true;
            }
        }
        public async Task<Guest> Get(Guid id)
        {
            using (var context = this.CreateDbContext())
            {
                return await context.Guest
                                    .Include(g => g.Menu)
                                    .ThenInclude(m => m.Item)
                                    .ThenInclude(i => i.Category)
                                    .SingleOrDefaultAsync(g => g.Id == id);
            }
        }
    }
}
