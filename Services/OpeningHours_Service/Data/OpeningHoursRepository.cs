using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OpeningHours_Service.Models;

namespace OpeningHours_Service.Data
{
    public class OpeningHoursRepository : IOpeningHoursRepository
    {
        private readonly DataContext _context;
        public OpeningHoursRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<OpeningHours> GetOpeningHours(DayOfWeek dayOfWeek)
        {
            return await _context.OpeningHours.FirstOrDefaultAsync(o => o.DayOfWeek == dayOfWeek);
        }
        public async Task<bool> IsOpenInThisDay(DayOfWeek dayOfWeek){
            var day= await _context.OpeningHours.FirstOrDefaultAsync(o => o.DayOfWeek == dayOfWeek);
            return day.Open;
        }
        public async Task<IEnumerable<SpecialOpeningHours>> GetAllSpecialOpeningHours()
        {
            return await _context.SpecialOpeningHours.ToListAsync();
        }
        public async Task<SpecialOpeningHours> GetSpecialOpeningHours(DateTime date)
        {
            return await _context.SpecialOpeningHours.FirstOrDefaultAsync(s=>s.Day.Date==date.Date);
        }
        public async Task<SpecialOpeningHours> GetSpecialOpeningHours(int id)
        {
            return await _context.SpecialOpeningHours.FirstOrDefaultAsync(s=>s.Id==id);
        }
        public void AddSpecialOpeningHours(SpecialOpeningHours special)
        {
            _context.SpecialOpeningHours.Add(special);
        }
        public void RemoveSpecialOpeningHours(SpecialOpeningHours special)
        {
            _context.Remove(special);
        }
        public async Task<IEnumerable<OpeningHours>> GetAllOpeningHours()
        {
            return await _context.OpeningHours.ToListAsync();
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

         public async Task<Tuple<int, int>> GetActualOpeningHours(DateTime dayOfReservations)
        {
            int openingHour, closingHour;
            var specialOpeningHours = await GetSpecialOpeningHours(dayOfReservations);
            if (specialOpeningHours != null)
            {
                openingHour = specialOpeningHours.Start.Hours;
                closingHour = specialOpeningHours.End.Hours;
            }
            else
            {
                var openingHours = await GetOpeningHours(dayOfReservations.DayOfWeek);
                openingHour = openingHours.Start.Hours;
                closingHour = openingHours.End.Hours;
            }
            return new Tuple<int, int>(openingHour, closingHour);
        }
    }
}