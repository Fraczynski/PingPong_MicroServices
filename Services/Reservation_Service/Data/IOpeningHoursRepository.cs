using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Reservation_Service.Models;

namespace Reservation_Service.Data
{
    public interface IOpeningHoursRepository
    {
        Task<OpeningHours> GetOpeningHours(DayOfWeek dayOfWeek);
        Task<bool> IsOpenInThisDay(DayOfWeek dayOfWeek);
        Task<IEnumerable<OpeningHours>> GetAllOpeningHours();
        Task<bool> SaveAll();
        Task<IEnumerable<SpecialOpeningHours>> GetAllSpecialOpeningHours();
        Task<SpecialOpeningHours> GetSpecialOpeningHours(DateTime date);
        Task<SpecialOpeningHours> GetSpecialOpeningHours(int id);
        void AddSpecialOpeningHours(SpecialOpeningHours special);
        void RemoveSpecialOpeningHours(SpecialOpeningHours special);
        Task<Tuple<int, int>> GetActualOpeningHours(DateTime dayOfReservations);
    }
}