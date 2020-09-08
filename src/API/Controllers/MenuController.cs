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