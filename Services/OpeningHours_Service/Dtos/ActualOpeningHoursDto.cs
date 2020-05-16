using System;

namespace OpeningHours_Service.Dtos
{
    public class ActualOpeningHoursDto
    {
        public bool IsOpen { get; set; }
        public TimeSpan Start { get; set; }
        public TimeSpan End { get; set; }
    }
}