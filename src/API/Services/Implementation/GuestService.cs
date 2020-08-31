using API.Services.Interfaces;
using DbRepository.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services.Implementation
{
    public class GuestService : IGuestService
    {
        public GuestService(IGuestRepository guestRepository, IMealRepository mealRepository, IMenuService menuService)
        {
            _guestRepository = guestRepository;
            _mealRepository = mealRepository;
            _menuService = menuService;
        }

        private readonly IGuestRepository _guestRepository;
        private readonly IMealRepository _mealRepository;
        private readonly IMenuService _menuService;

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
            var mealList = await GetMeals(id);
            var dishList = await _menuService.GetDishes();
            foreach (var meal in mealList.Where(m => !dishes.Any(d => d.Id == m.DishId)))
            {
                await _mealRepository.DeleteMeal(meal.Id);
            }
            mealList = await GetMeals(id);
            foreach (var dish in dishList.Where(d => !mealList.Any(m => m.DishId == d.Id)))
            {
                await _mealRepository.CreateMeal(new Meal
                {
                    GuestId = id,
                    DishId = dish.Id
                });
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
