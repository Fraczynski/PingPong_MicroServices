using System;

namespace OpeningHours_Service.Models
{
    public class ClosingDay
    {
        public int Id { get; set; }
        public DateTime Day { get; set; }
        public String Description{get;set;}
    }
}