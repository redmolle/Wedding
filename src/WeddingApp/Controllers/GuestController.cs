using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WeddingApp.Services.Guest;

namespace WeddingApp.Controllers
{
    /// <summary>
    /// Контроллер гостей.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class GuestController : ControllerBase
    {
        /// <summary>
        /// Сервис гостей.
        /// </summary>
        private IGuestService _service;

        /// <summary>
        /// Конструктор контроллера гостей.
        /// </summary>
        /// <param name="service"></param>
        public GuestController(IGuestService service)
        {
            _service = service;
        }

        /// <summary>
        /// Получить гостя.
        /// </summary>
        /// <param name="id">Id гостя.</param>
        /// <returns>Гость.</returns>
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetGuest(Guid id)
        {
            return Ok(await _service.GetGuest(id));
        }

        /// <summary>
        /// Получить гостей.
        /// </summary>
        /// <returns>Набор гостей.</returns>
        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> GetAllGuests()
        {
            return Ok(await _service.GetGuests());
        }

        /// <summary>
        /// Подтвердить приглашение.
        /// </summary>
        /// <param name="id">Id гостя.</param>
        /// <returns>Без контента.</returns>
        [HttpGet]
        [Route("invite/confirm/{id}")]
        public async Task<IActionResult> ConfirmInvite(Guid id)
        {
            await _service.ConfirmInvite(id, true);
            return NoContent();
        }

        /// <summary>
        /// Отклонить приглашение.
        /// </summary>
        /// <param name="id">Id гостя.</param>
        /// <returns>Без контента.</returns>
        [HttpGet]
        [Route("invite/refuse/{id}")]
        public async Task<IActionResult> RefuseInvite(Guid id)
        {
            await _service.ConfirmInvite(id, false);
            return NoContent();
        }

        /// <summary>
        /// Принять приглашение в ЗАГС.
        /// </summary>
        /// <param name="id">Id гостя.</param>
        /// <returns>Без контента</returns>
        [HttpGet]
        [Route("ZAGS/confirm/{id}")]
        public async Task<IActionResult> ConfirmZAGS(Guid id)
        {
            await _service.ConfirmZags(id, true);
            return NoContent();
        }

        /// <summary>
        /// Отклонить приглашение в ЗАГС.
        /// </summary>
        /// <param name="id">Id гостя.</param>
        /// <returns>Без контента.</returns>
        [HttpGet]
        [Route("ZAGS/refuse/{id}")]
        public async Task<IActionResult> RefuseZAGS(Guid id)
        {
            await _service.ConfirmZags(id, false);
            return NoContent();
        }

        /// <summary>
        /// Получить набор выбранных блюд.
        /// </summary>
        /// <param name="id">Id гостя.</param>
        /// <returns>Набор выбранных блюд.</returns>
        [HttpGet]
        [Route("meal/{id}")]
        public async Task<IActionResult> GetMeal(Guid id)
        {
            return Ok(await _service.GetMeals(id));
        }

        /// <summary>
        /// Выбрать блюда.
        /// </summary>
        /// <param name="id">Id гостя.</param>
        /// <param name="dishesIdSet">Набор id блюд.</param>
        /// <returns>Без контента.</returns>
        [HttpPost]
        [Route("meal/{id}")]
        public async Task<IActionResult> ChooseMeal(Guid id, ICollection<Guid> dishesIdSet)
        {
            await _service.ChooseMeals(id, dishesIdSet);
            return NoContent();
        }
    }
}