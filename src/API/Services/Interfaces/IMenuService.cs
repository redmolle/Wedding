using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services.Interfaces
{
    public interface IMenuService
    {
        Task<IEnumerable<Category>> GetCategories();
        Task<IEnumerable<Dish>> GetDishes();
    }
}
