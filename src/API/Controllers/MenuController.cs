using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DbRepository.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        public MenuController(IMenuRepository menuRepository)
        {
            _menuRepository = menuRepository;
        }

        private IMenuRepository _menuRepository;

        [HttpGet]
        [Route("choose/{id}")]
        [HttpGet]
        public async Task<IActionResult> ChooseMenu(Guid id)
        {
            var isChoosed = await _menuRepository.Choose(id);
            if (!isChoosed)
            {
                return NotFound(new HttpErrorMessage("Меню не найдено!"));
            }

            return NoContent();
        }
    }
}