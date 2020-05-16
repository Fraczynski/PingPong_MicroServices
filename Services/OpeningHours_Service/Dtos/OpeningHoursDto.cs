using System;
using System.ComponentModel.DataAnnotations;

namespace OpeningHours_Service.Dtos
{
    public class OpeningHoursDto
    {
        public DayOfWeek DayOfWeek { get; set; }
        [Required(ErrorMessage = "Nowa godzina zamknięcia jest wymagana.")]
        public TimeSpan Start { get; set; }
        [Required(ErrorMessage = "Nowa godzina zamknięcia jest wymagana.")]

        public TimeSpan End { get; set; }
        public bool Open { get; set; }
    }
}