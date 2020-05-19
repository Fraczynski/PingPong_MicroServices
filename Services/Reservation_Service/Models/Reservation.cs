using System;

namespace Reservation_Service.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? PingPongTableId { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public ReservationStatus ReservationStatus { get; set; }
    }
}