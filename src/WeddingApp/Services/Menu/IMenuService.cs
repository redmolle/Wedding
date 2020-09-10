using System.Collections.Generic;
using System.Threading.Tasks;
using WeddingApp.Models;

namespace WeddingApp.Services.Menu
{
    /// <summary>
    /// Сервис меню.
    /// </summary>
    public interface IMenuService
    {
        /// <summary>
        /// Получить все категории блюд.
        /// </summary>
        /// <returns>Набор категорий блюд.</returns>
        Task<IEnumerable<Category>> GetCategories();

        /// <summary>
        /// Получить все блюда.
        /// </summary>
        /// <returns>Набор блюд.</returns>
        Task<IEnumerable<Dish>> GetDishes();
    }
}
