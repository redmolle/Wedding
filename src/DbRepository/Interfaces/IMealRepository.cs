using Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DbRepository.Interfaces
{
    public interface IMealRepository
    {
        Task<IEnumerable<Meal>> GetMeals(Guid guestId);
        Task CreateMeal(Meal meal);
        Task DeleteMeal(Guid id);
    }
}
