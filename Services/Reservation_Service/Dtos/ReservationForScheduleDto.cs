using System;

namespace Reservation_Service.Dtos
{
    public class ReservationForScheduleDto
    {
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}