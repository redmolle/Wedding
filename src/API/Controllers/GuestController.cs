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
    public class GuestController : ControllerBase
    {
        public GuestController(IGuestRepository guestRepository)
        {
            _guestRepository = guestRepository;
        }

        private IGuestRepository _guestRepository;

        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> Get(Guid id)
        {
            var guest = await _guestRepository.Get(id);
            if (guest == null)
            {
                return NotFound(new HttpErrorMessage("Гость не найден!"));
            }

            return Ok(guest);
        }

        [Route("confirmInvite/{id}")]
        [HttpGet]
        public async Task<IActionResult> ConfirmInvite(Guid id)
        {
            var isUpdated = await _guestRepository.ConfirmInvite(id);
            if (!isUpdated)
            {
                return BadRequest(new HttpErrorMessage("Ошибка при подтвеждении"));
            }
            return NoContent();
        }

        [Route("confirmZAGS/{id}")]
        [HttpGet]
        public async Task<IActionResult> ConfirmZAGS(Guid id)
        {
            var isUpdated = await _guestRepository.ConfirmZAGS(id);
            if (!isUpdated)
            {
                return BadRequest(new HttpErrorMessage("Ошибка при подтвеждении"));
            }
            return NoContent();
        }
    }
}