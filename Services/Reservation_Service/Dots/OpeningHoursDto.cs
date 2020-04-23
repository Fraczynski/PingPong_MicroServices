using System;
using System.ComponentModel.DataAnnotations;

namespace Reservation_Service.Dtos
{
    public class OpeningHoursDto
    {
        public DayOfWeek DayOfWeek { get; set; }
        [Required(ErrorMessage = "Nowa godzina zamknięcia jest wymagana.")]
        [Range(0, 23, ErrorMessage = "Nieprawidłowa godzina")]
        public int Start { get; set; }
        [Required(ErrorMessage = "Nowa godzina zamknięcia jest wymagana.")]
        [Range(0, 23, ErrorMessage = "Nieprawidłowa godzina")]
        
        public int End { get; set; }
        public bool Open { get; set; }
    }
}