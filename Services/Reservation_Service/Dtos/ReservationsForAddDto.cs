using System.Collections.Generic;

namespace Reservation_Service.Dtos
{
    public class ReservationsForAddDto
    {
        public IEnumerable<ReservationForAddDto> reservationsToAdd { get; set; }
        public int UserId { get; set; }
    }
}