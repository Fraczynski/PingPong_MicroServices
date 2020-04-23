using System;

namespace Reservation_Service.Dtos
{
    public class ReservationForAddDto
    {
        public int PingPongTableId { get; set; }
        public DateTime Start { get; set; }
    }
}