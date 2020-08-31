using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Services.Interfaces;
using DbRepository.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GuestController : ControllerBase
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
            try
            {
                return Ok(await _service.GetGuest(id));
            }
            catch(KeyNotFoundException)
            {
                return NotFound();
            }
            catch
            {
                return BadRequest();
            }
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
    }
}