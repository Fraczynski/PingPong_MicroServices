using System;

namespace Reservation_Service.Models
{
    public class OpeningHours
    {
        public int Id { get; set; }
        public DayOfWeek DayOfWeek { get; set; }
        public TimeSpan Start { get; set; }
        public TimeSpan End { get; set; }
        public bool Open { get; set; }
    }
}