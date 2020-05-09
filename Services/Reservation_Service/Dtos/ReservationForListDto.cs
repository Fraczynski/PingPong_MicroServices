using System;

namespace Reservation_Service.Dtos
{
    public class ReservationForListDto
    {
        public int Id { get; set; }
        public int PingPongTableId { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public int UserId { get; set; }
    }
}