using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WeddingApp.Services.Menu;

namespace WeddingApp.Controllers
{
    /// <summary>
    /// Контроллер меню.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        /// <summary>
        /// Сервис меню.
        /// </summary>
        private readonly IMenuService _service;

        /// <summary>
        /// Конструктор контроллера меню.
        /// </summary>
        /// <param name="service"></param>
        public MenuController(IMenuService service)
        {
            _service = service;
        }

        /// <summary>
        /// Получить категории.
        /// </summary>
        /// <returns>Набор категорий.</returns>
        [HttpGet]
        [Route("categories")]
        public async Task<IActionResult> GetCategories()
        {
            return Ok(await _service.GetCategories());
        }

        /// <summary>
        /// Получить блюда.
        /// </summary>
        /// <returns>Набор блюд.</returns>
        [HttpGet]
        [Route("dishes")]
        public async Task<IActionResult> GetDishes()
        {
            return Ok(await _service.GetDishes());
        }
    }
}