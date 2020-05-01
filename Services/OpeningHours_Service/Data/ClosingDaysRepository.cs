using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OpeningHours_Service.Models;

namespace OpeningHours_Service.Data
{
    public class ClosingDaysRepository : IClosingDaysRepository
    {
        private readonly DataContext _context;
        public ClosingDaysRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<ClosingDay>> GetAllClosingDays()
        {
            return await _context.ClosingDays.ToListAsync();
        }
        public async Task<ClosingDay> GetClosingDay(int id)
        {
            return await _context.ClosingDays.FirstOrDefaultAsync(c => c.Id == id);
        }
        public void AddClosingDay(ClosingDay day)
        {
            _context.ClosingDays.Add(day);
        }
        public void RemoveClosingDay(ClosingDay day)
        {
            _context.Remove(day);
        }

        public async Task<bool> IsInClosedDays(DateTime date)
        {
            return await _context.ClosingDays.AnyAsync(c=>c.Day.Date==date.Date);
        }
        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync()>0;
        }
    }
}