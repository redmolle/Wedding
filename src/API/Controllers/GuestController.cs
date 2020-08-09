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
            var isUpdated = await ConfirmInvite(id, true);
            if (!isUpdated)
            {
                return BadRequest(new HttpErrorMessage("Ошибка при подтвеждении"));
            }
            return NoContent();
        }

        [Route("refuseInvite/{id}")]
        [HttpGet]
        public async Task<IActionResult> RefuseInvite(Guid id)
        {
            var isUpdated = await ConfirmInvite(id, false);
            if (!isUpdated)
            {
                return BadRequest(new HttpErrorMessage("Ошибка при отклонении"));
            }
            return NoContent();
        }

        [Route("confirmZAGS/{id}")]
        [HttpGet]
        public async Task<IActionResult> ConfirmZAGS(Guid id)
        {
            var isUpdated = await _guestRepository.ConfirmZAGS(id, true);
            if (!isUpdated)
            {
                return BadRequest(new HttpErrorMessage("Ошибка при подтвеждении"));
            }
            return NoContent();
        }

        [Route("refuseZAGS/{id}")]
        [HttpGet]
        public async Task<IActionResult> RefuseZAGS(Guid id)
        {
            var isUpdated = await _guestRepository.ConfirmZAGS(id, false);
            if (!isUpdated)
            {
                return BadRequest(new HttpErrorMessage("Ошибка при подтвеждении"));
            }
            return NoContent();
        }


        private async Task<bool> ConfirmInvite(Guid id, bool isConfirmed)
        {
            var isUpdated = await _guestRepository.ConfirmInvite(id, isConfirmed);

            return !isUpdated ? false : true;
        }
        private async Task<bool> ConfirmZAGS(Guid id, bool isConfirmed)
        {
            var isUpdated = await _guestRepository.ConfirmZAGS(id, isConfirmed);

            return !isUpdated ? false : true;
        }
    }
}