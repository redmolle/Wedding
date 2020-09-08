using Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DbRepository.Interfaces
{
    public interface IGuestRepository
    {
        Task AddGuest(Guest guest);
        Task<Guest> GetGuest(Guid id);
        Task<IEnumerable<Guest>> GetGuests();
        Task UpdateGuest(Guest guest);
    }
}
