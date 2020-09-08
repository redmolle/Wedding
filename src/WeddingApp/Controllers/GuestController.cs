using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Models;
using WeddingApp.Services.Interfaces;

namespace WeddingApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GuestController : Controller
    {
        public GuestController(IGuestService service)
        {
            _service = service;
        }

        private IGuestService _service;

        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> GetGuest(Guid id)
        {
            return Ok(await _service.GetGuest(id));
        }

        [Route("all")]
        [HttpGet]
        public async Task<IActionResult> GetAllGuests()
        {
            return Ok(await _service.GetGuests());
        }

        [Route("invite/confirm/{id}")]
        [HttpGet]
        public async Task<IActionResult> ConfirmInvite(Guid id)
        {
            await _service.ConfirmInvite(id, true);
            return Ok();
        }

        [Route("invite/refuse/{id}")]
        [HttpGet]
        public async Task<IActionResult> RefuseInvite(Guid id)
        {
            await _service.ConfirmInvite(id, false);
            return Ok();
        }

        [Route("ZAGS/confirm/{id}")]
        [HttpGet]
        public async Task<IActionResult> ConfirmZAGS(Guid id)
        {
            await _service.ConfirmZags(id, true);
            return Ok();
        }

        [Route("ZAGS/refuse/{id}")]
        [HttpGet]
        public async Task<IActionResult> RefuseZAGS(Guid id)
        {
            await _service.ConfirmZags(id, false);
            return Ok();
        }

        [Route("meal/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetMeal(Guid id)
        {
            return Ok(await _service.GetMeals(id));
        }

        [Route("meal/{id}")]
        [HttpPost]
        public async Task<IActionResult> ChooseMeal(Guid id, IEnumerable<Guid> dishesIdSet)
        {
            await _service.ChooseMeals(id, dishesIdSet.Select(s => new Dish { Id = s }));
            return Ok();
        }
    }
}