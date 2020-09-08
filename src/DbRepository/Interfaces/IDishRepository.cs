using Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DbRepository.Interfaces
{
    public interface IDishRepository
    {
        Task<IEnumerable<Dish>> GetDishes();
    }
}
