using DbRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbRepository.Repositories
{
    public class GuestRepository : Repository, IGuestRepository
    {
        public GuestRepository(AppSettings settings, IRepositoryContextFactory contextFactory)
            : base(settings, contextFactory) { }

        public async Task AddGuest(Guest create)
        {
            using (var context = CreateDbContext())
            {
                context.Guest.Add(create);
                await context.SaveChangesAsync();
            }
        }

        public async Task<Guest> GetGuest(Guid id)
        {
            using (var context = CreateDbContext())
            {
                return await context.Guest.SingleOrDefaultAsync(s => s.Id == id);
            }
        }

        public async Task<IEnumerable<Guest>> GetGuests()
        {
            using (var context = CreateDbContext())
            {
                return await context.Guest.ToListAsync();
            }
        }

        public async Task UpdateGuest(Guest update)
        {
            using (var context = CreateDbContext())
            {
                context.Entry(update).State = EntityState.Modified;
                    await context.SaveChangesAsync();
            }
        }
    }
}
