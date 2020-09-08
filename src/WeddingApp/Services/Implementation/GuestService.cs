using DbRepository.Interfaces;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeddingApp.Services.Interfaces;

namespace WeddingApp.Services.Implementation
{
    public class GuestService : IGuestService
    {
        public GuestService(IGuestRepository guestRepository, IMealRepository mealRepository, IMenuService menuService)
        {
            _guestRepository = guestRepository;
            _mealRepository = mealRepository;
        }

        private readonly IGuestRepository _guestRepository;
        private readonly IMealRepository _mealRepository;

        public async Task ConfirmInvite(Guid id, bool isConfirmed)
        {
            var guest = await GetGuest(id);
            guest.IsConfirmedIvite = isConfirmed;
            await _guestRepository.UpdateGuest(guest);
        }

        public async Task ConfirmZags(Guid id, bool isConfirmed)
        {
            var guest = await GetGuest(id);
            guest.IsConfirmedIvite = isConfirmed;
            await _guestRepository.UpdateGuest(guest);
        }

        public async Task<Guest> GetGuest(Guid id)
        {
            await EnsureGuestExists(id);
            return await _guestRepository.GetGuest(id);
        }

        public async Task<IEnumerable<Guest>> GetGuests()
        {
            return await _guestRepository.GetGuests();
        }


        public async Task<IEnumerable<Meal>> GetMeals(Guid id)
        {
            await EnsureGuestExists(id);
            return await _mealRepository.GetMeals(id);
        }

        public async Task ChooseMeals(Guid id, IEnumerable<Dish> dishes)
        {
            await EnsureGuestExists(id);
            var meals = await GetMeals(id);
            var toDelete = meals.Where(w => !dishes.Any(a => a.Id == w.DishId));
            var toCreate = dishes.Where(w => !meals.Any(a => a.DishId == w.Id)).Select(s => new Meal { GuestId = id, DishId = s.Id });

            foreach (var meal in toDelete)
            {
                await _mealRepository.DeleteMeal(meal.Id);
            }

            foreach (var meal in toCreate)
            {
                await _mealRepository.CreateMeal(meal);
            }
        }

        public async Task EnsureGuestExists(Guid id)
        {
            var guest = await _guestRepository.GetGuest(id);
            if (guest == null)
            {
                throw new KeyNotFoundException();
            }
        }
    }
}
