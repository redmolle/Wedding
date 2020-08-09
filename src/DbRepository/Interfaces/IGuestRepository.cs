using Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DbRepository.Interfaces
{
    public interface IGuestRepository
    {
        Task<Guest> Get(Guid id);

        Task<bool> ConfirmInvite(Guid id, bool? isConfirmed);

        Task<bool> ConfirmZAGS(Guid id, bool? isConfirmed);
    }
}
