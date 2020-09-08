using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WeddingApp.Services.Interfaces;

namespace WeddingApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MenuController : Controller
    {
        public MenuController(IMenuService menuService)
        {
            _service = menuService;
        }

        private readonly IMenuService _service;

        [Route("categories")]
        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            return Ok(await _service.GetCategories());
        }

        [Route("dishes")]
        [HttpGet]
        public async Task<IActionResult> GetDishes()
        {
            return Ok(await _service.GetDishes());
        }
    }
}