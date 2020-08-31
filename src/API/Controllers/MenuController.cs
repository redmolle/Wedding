using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        public MenuController(IMenuService menuService)
        {
            _menuService = menuService;
        }

        private readonly IMenuService _menuService;

        [Route("categories")]
        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            return Ok(await _menuService.GetCategories());
        }

        [Route("dishes")]
        [HttpGet]
        public async Task<IActionResult> GetDishes()
        {
            return Ok(await _menuService.GetDishes());
        }
    }
}