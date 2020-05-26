using System;
using Reservation_Service.Models;

namespace Reservation_Service.Dtos
{
    public class ReportParams
    {
        public Nullable<int> UserId { get; set; }
        public Nullable<int> PingPongTableId { get; set; }
        public Nullable<DateTime> MinDate { get; set; }
        public Nullable<DateTime> MaxDate { get; set; }
        public Nullable<ReservationStatus> ReservationStatus { get; set; }
    }
}