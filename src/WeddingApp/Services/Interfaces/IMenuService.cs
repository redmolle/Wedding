using Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WeddingApp.Services.Interfaces
{
    public interface IMenuService
    {
        Task<IEnumerable<Category>> GetCategories();
        Task<IEnumerable<Dish>> GetDishes();
    }
}
