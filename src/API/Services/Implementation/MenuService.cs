using API.Services.Interfaces;
using DbRepository.Interfaces;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services.Implementation
{
    public class MenuService : IMenuService
    {
        public MenuService(ICategoryRepository categoryRepository, IDishRepository dishRepository)
        {
            _categoryRepository = categoryRepository;
            _dishRepository = dishRepository;
        }

        private readonly ICategoryRepository _categoryRepository;
        private readonly IDishRepository _dishRepository;
        public async Task<IEnumerable<Category>> GetCategories()
        {
            return await _categoryRepository.GetCategories();
        }

        public async Task<IEnumerable<Dish>> GetDishes()
        {
            return await _dishRepository.GetDishes();
        }
    }
}
