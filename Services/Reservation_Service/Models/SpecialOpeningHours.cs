using System;

namespace Reservation_Service.Models
{
    public class SpecialOpeningHours
    {
        public int Id { get; set; }
        public DateTime Day { get; set; }
        public TimeSpan Start { get; set; }
        public TimeSpan End { get; set; }
        public String Description{get;set;}
    }
}