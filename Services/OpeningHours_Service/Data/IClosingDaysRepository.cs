using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using OpeningHours_Service.Models;

namespace OpeningHours_Service.Data
{
    public interface IClosingDaysRepository
    {
        Task<IEnumerable<ClosingDay>> GetAllClosingDays();
        Task<ClosingDay> GetClosingDay(int id);
        void AddClosingDay(ClosingDay day);
        void RemoveClosingDay(ClosingDay day);
        Task<bool> SaveAll();
        Task<bool> IsInClosedDays(DateTime date);
    }
}