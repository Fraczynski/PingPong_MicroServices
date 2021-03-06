using System;
using Reservation_Service.Models;

namespace Reservation_Service.Dtos
{
    public class ReservationForListDto
    {
        public int Id { get; set; }
        public int PingPongTableId { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public int UserId { get; set; }
        public ReservationStatus ReservationStatus { get; set; }
    }
}