using System;
using System.ComponentModel.DataAnnotations;

namespace OpeningHours_Service.Dtos
{
    public class SpecialOpeningHoursDto
    {
        public int Id { get; set; }
        public DateTime Day { get; set; }
        [Required(ErrorMessage = "Nowa godzina rozpoczęcia jest wymagana.")]
        public TimeSpan Start { get; set; }
        [Required(ErrorMessage = "Nowa godzina zamknięcia jest wymagana.")]
        public TimeSpan End { get; set; }
        public String Description { get; set; }
    }
}