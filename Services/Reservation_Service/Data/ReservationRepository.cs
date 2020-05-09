using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Reservation_Service.Dtos;
using Reservation_Service.Helpers;
using Reservation_Service.Models;

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
            return await _context.Reservations.AnyAsync(r => (r.PingPongTableId == reservation.PingPongTableId &&
            (
             (r.Start <= reservation.Start && r.End > reservation.Start) ||
             (r.Start < reservation.End && r.End >= reservation.End) ||
             (r.Start <= reservation.Start && r.End >= reservation.End) ||
             (r.Start >= reservation.Start && r.End <= reservation.End)))
            );
        }
        public void AddReservations(IEnumerable<Reservation> reservationsToAdd)
        {
            _context.AddRange(reservationsToAdd);
        }
        public async Task<IEnumerable<Reservation>> getTableReservations(int tableId, DateTime day)
        {
            return await _context.Reservations.Where(r => (r.PingPongTableId == tableId && r.Start.Date == day.Date)).ToListAsync();
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
        public async Task<PagedList<Reservation>> GetReservations(ReservationParams reservationParams)
        {
            var reservations = _context.Reservations.OrderBy(r => r.Start).AsQueryable();
            if (reservationParams.Start != DateTime.MinValue)
            {
                reservations = reservations.Where(r => r.Start.Date == reservationParams.Start.Date);
            }
            if (reservationParams.UserId != null)
            {
                reservations = reservations.Where(r => r.UserId == reservationParams.UserId);
            }
            if (reservationParams.PingPongTableId != null)
            {
                reservations = reservations.Where(r => r.PingPongTableId == reservationParams.PingPongTableId);
            }
            if (!string.IsNullOrEmpty(reservationParams.OrderBy))
            {
                switch (reservationParams.OrderBy)
                {
                    case "userId":
                        {
                            reservations = reservations.OrderBy(r => r.UserId);
                            break;
                        }
                    case "pingPongTableId":
                        {
                            reservations = reservations.OrderBy(r => r.PingPongTableId);
                            break;
                        }
                    default:
                        {
                            reservations = reservations.OrderBy(r => r.Start);
                            break;
                        }
                }
            }

            return await PagedList<Reservation>.CreateAsync(reservations, reservationParams.PageNumber, reservationParams.PageSize);
        }
    }
}