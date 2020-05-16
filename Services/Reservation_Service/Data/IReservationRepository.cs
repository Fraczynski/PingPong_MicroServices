using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Reservation_Service.Helpers;
using Reservation_Service.Models;

namespace Reservation_Service.Data
{
    public interface IReservationRepository
    {
        void AddReservations(IEnumerable<Reservation> reservationsToAdd);
        Task<bool> IsReservationTaken(Reservation reservation);
        Task<IEnumerable<Reservation>> getTableReservations(int tableId, DateTime day);
        Task<Reservation> GetReservation(int id);
        Task<bool> SaveAll();
        Task<PagedList<Reservation>> GetReservations(ReservationParams reservationParams);
    }
}