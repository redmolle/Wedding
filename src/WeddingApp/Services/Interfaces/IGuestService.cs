using Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WeddingApp.Services.Interfaces
{
    public interface IGuestService
    {
        Task<IEnumerable<Guest>> GetGuests();
        Task<Guest> GetGuest(Guid id);
        Task ConfirmInvite(Guid id, bool isConfirmed);
        Task ConfirmZags(Guid id, bool isConfirmed);
        Task<IEnumerable<Meal>> GetMeals(Guid id);
        Task EnsureGuestExists(Guid id);
        Task ChooseMeals(Guid id, IEnumerable<Dish> dishes);
    }
}
