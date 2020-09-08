using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeddingApp.Data;
using WeddingApp.Models;

namespace WeddingApp.Services.Menu
{
    /// <summary>
    /// Сервис меню.
    /// </summary>
    public class MenuService : IMenuService
    {
        /// <summary>
        /// Контекст бд.
        /// </summary>
        private readonly WeddingContext _context;

        /// <summary>
        /// Конструктор сервиса меню.
        /// </summary>
        /// <param name="context">Контекст бд.</param>
        public MenuService(WeddingContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Получить все категории блюд.
        /// </summary>
        /// <returns>Набор категорий блюд.</returns>
        public async Task<ICollection<Category>> GetCategories()
        {
            var categories = _context.Category.OrderBy(c => c.SortOrder).AsNoTracking();
            return await categories.ToListAsync();
        }

        /// <summary>
        /// Получить все блюда.
        /// </summary>
        /// <returns>Набор блюд.</returns>
        public async Task<ICollection<Dish>> GetDishes()
        {
            var dishes = _context.Dish.OrderBy(d => d.Name).AsNoTracking();
            return await dishes.ToListAsync();
        }
    }
}
