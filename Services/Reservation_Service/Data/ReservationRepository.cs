using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Reservation_Service.Models;
using System;
using System.Globalization;
using System.Linq;
using Reservation_Service.Helpers;

namespace Reservation_Service.Data
{
    public class ReservationRepository : IReservationRepository
    {
        private readonly DataContext _context;

        public ReservationRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<bool> IsReservationTaken(Reservation reservation)
        {
            return await _context.Reservations.AnyAsync(r => (r.PingPongTableId == reservation.PingPongTableId && r.Start == reservation.Start));
        }
        public void AddReservations(IEnumerable<Reservation> reservationsToAdd)
        {
            _context.AddRange(reservationsToAdd);
        }
        public async Task<IEnumerable<Reservation>> getTableReservations(int tableId, DateTime day)
        {
            return await _context.Reservations.Where(r => (r.PingPongTableId == tableId && r.Start.Date == day.Date)).ToListAsync();
        }
        public async Task<IEnumerable<Reservation>> getUserReservations(int userId)
        {
            return await _context.Reservations.Where(r => (r.UserId == userId)).ToListAsync();
        }
        public void DeleteReservation(Reservation reservation)
        {
            _context.Reservations.Remove(reservation);
        }
        public async Task<Reservation> GetReservation(int id)
        {
            return await _context.Reservations.FirstOrDefaultAsync(r => r.Id == id);
        }
        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
        public async Task<string> GetTableLabel(int tableId)
        {
            var table = await _context.Tables.FirstOrDefaultAsync(t => t.Id == tableId);
            return table.Label;
        }
        public async Task<PagedList<Reservation>> GetAllReservations(ReservationParams reservationParams)
        {
            var reservations = _context.Reservations.Include(r => r.PingPongTable).OrderBy(r => r.Start).AsQueryable();
            if (!string.IsNullOrEmpty(reservationParams.PingPongTableLabel))
            {
                reservations = reservations.Where(r => r.PingPongTable.Label.ToLower().Contains(reservationParams.PingPongTableLabel.ToLower()));
            }
            if (reservationParams.Start != DateTime.MinValue)
            {
                reservations = reservations.Where(r => r.Start.Date == reservationParams.Start.Date);
            }
            if (reservationParams.UserId != null)
            {
                reservations = reservations.Where(r => r.UserId == reservationParams.UserId);
            }
            if (!string.IsNullOrEmpty(reservationParams.OrderBy))
            {
                switch(reservationParams.OrderBy)
                {
                    case "userId":{
                        reservations=reservations.OrderBy(r=>r.UserId);
                        break;
                    }
                    case "pingPongTableLabel":{
                        reservations=reservations.OrderBy(r=>r.PingPongTable.Label);
                        break;
                    }
                    default:{
                         reservations=reservations.OrderBy(r=>r.Start);
                        break;
                    }
                }
            }

            return await PagedList<Reservation>.CreateAsync(reservations, reservationParams.PageNumber, reservationParams.PageSize);
        }
    }
}