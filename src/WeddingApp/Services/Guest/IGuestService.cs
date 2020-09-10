using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WeddingApp.Models;

namespace WeddingApp.Services.Guest
{
    /// <summary>
    /// Сервис гостей.
    /// </summary>
    public interface IGuestService
    {
        /// <summary>
        /// Сохранить выбранные блюда.
        /// </summary>
        /// <param name="id">Id гостя.</param>
        /// <param name="dishes">Набор блюд.</param>
        /// <returns>Таск.</returns>
        Task ChooseMeals(Guid id, IEnumerable<Guid> dishes);

        /// <summary>
        /// Принять/отклонить приглашение.
        /// </summary>
        /// <param name="id">Id гостя.</param>
        /// <param name="isConfirmed">Признак принятия приглашения.</param>
        /// <returns>Таск.</returns>
        Task ConfirmInvite(Guid id, bool isConfirmed);

        /// <summary>
        /// Принять/отклонить приглашение в ЗАГС.
        /// </summary>
        /// <param name="id">Id гостя.</param>
        /// <param name="isConfirmed">Признак принятия приглашения.</param>
        /// <returns>Таск.</returns>
        Task ConfirmZags(Guid id, bool isConfirmed);

        /// <summary>
        /// Убедиться в существовании гостя.
        /// </summary>
        /// <param name="id">Id гостя.</param>
        /// <returns>Таск.</returns>
        Task EnsureGuestExists(Guid id);

        /// <summary>
        /// Получить гостя.
        /// </summary>
        /// <param name="id">Id гостя.</param>
        /// <returns>Гость.</returns>
        Task<Models.Guest> GetGuest(Guid id);

        /// <summary>
        /// Получить всех гостей.
        /// </summary>
        /// <returns>Набор гостей.</returns>
        Task<IEnumerable<Models.Guest>> GetGuests();

        /// <summary>
        /// Получить набор выбранных блюд гостя.
        /// </summary>
        /// <param name="id">Id гостя.</param>
        /// <returns>Набор выбранных блюд.</returns>
        Task<IEnumerable<Meal>> GetMeals(Guid id);
    }
}
