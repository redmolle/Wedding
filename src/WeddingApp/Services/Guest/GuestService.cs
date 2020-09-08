using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeddingApp.Data;
using WeddingApp.Models;
using WeddingApp.Services.Menu;

namespace WeddingApp.Services.Guest
{
    /// <summary>
    /// Сервис гостей.
    /// </summary>
    public class GuestService : IGuestService
    {
        /// <summary>
        /// Контекст бд.
        /// </summary>
        private readonly WeddingContext _context;

        /// <summary>
        /// Сервис гостей.
        /// </summary>
        /// <param name="context">Контекст бд.</param>
        public GuestService(WeddingContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Сохранить выбранные блюда.
        /// </summary>
        /// <param name="id">Id гостя.</param>
        /// <param name="dishes">Набор блюд.</param>
        /// <returns>Таск.</returns>
        public async Task ChooseMeals(Guid id, ICollection<Guid> dishes)
        {
            await EnsureGuestExists(id);
            var meals = await GetMeals(id);
            var toDelete = meals.Where(m => !dishes.Any(d => d == m.DishId));
            var toCreate = dishes.Where(d => !meals.Any(m => m.DishId == d));
            _context.Meal.RemoveRange(toDelete);
            _context.Meal.AddRange(toCreate.Select(d => new Meal()
            {
                GuestId = id,
                DishId = d,
            }));
            await _context.SaveChangesAsync();
        }

        /// <summary>
        /// Принять/отклонить приглашение.
        /// </summary>
        /// <param name="id">Id гостя.</param>
        /// <param name="isConfirmed">Признак принятия приглашения.</param>
        /// <returns>Таск.</returns>
        public async Task ConfirmInvite(Guid id, bool isConfirmed)
        {
            var guest = await GetGuest(id);
            guest.IsConfirmedIvite = isConfirmed;
            await _context.SaveChangesAsync();
        }

        /// <summary>
        /// Принять/отклонить приглашение в ЗАГС.
        /// </summary>
        /// <param name="id">Id гостя.</param>
        /// <param name="isConfirmed">Признак принятия приглашения.</param>
        /// <returns>Таск.</returns>
        public async Task ConfirmZags(Guid id, bool isConfirmed)
        {
            var guest = await GetGuest(id);
            guest.IsConfirmedZAGS = isConfirmed;
            await _context.SaveChangesAsync();
        }

        /// <summary>
        /// Убедиться в существовании гостя.
        /// </summary>
        /// <param name="id">Id гостя.</param>
        /// <returns>Таск.</returns>
        public async Task EnsureGuestExists(Guid id)
        {
            var guest = await _context.Guest.AsNoTracking().FirstOrDefaultAsync(g => g.Id == id);
            if (guest == null)
            {
                throw new KeyNotFoundException();
            }
        }

        /// <summary>
        /// Получить гостя.
        /// </summary>
        /// <param name="id">Id гостя.</param>
        /// <returns>Гость.</returns>
        public async Task<Models.Guest> GetGuest(Guid id)
        {
            await EnsureGuestExists(id);
            var guest = await _context.Guest.FirstOrDefaultAsync(g => g.Id == id);
            return guest;
        }

        /// <summary>
        /// Получить всех гостей.
        /// </summary>
        /// <returns>Набор гостей.</returns>
        public async Task<ICollection<Models.Guest>> GetGuests()
        {
            return await _context.Guest.AsNoTracking().ToListAsync();
        }

        /// <summary>
        /// Получить набор выбранных блюд гостя.
        /// </summary>
        /// <param name="id">Id гостя.</param>
        /// <returns>Набор выбранных блюд.</returns>
        public async Task<ICollection<Meal>> GetMeals(Guid id)
        {
            await EnsureGuestExists(id);
            var meals = _context.Meal.AsNoTracking().Where(m => m.GuestId == id);
            return await meals.ToListAsync();
        }
    }
}
