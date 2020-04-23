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
        void DeleteReservation(Reservation reservation);
        Task<IEnumerable<Reservation>> getTableReservations(int tableId,DateTime day);
        Task<IEnumerable<Reservation>> getUserReservations(int userId);
        Task<Reservation> GetReservation(int id);
        Task<bool> SaveAll();
        Task<PagedList<Reservation>> GetAllReservations(ReservationParams reservationParams);
        Task<string> GetTableLabel(int tableId);
    }
}