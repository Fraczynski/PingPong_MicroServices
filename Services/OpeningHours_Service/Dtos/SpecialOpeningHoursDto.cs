using System;
using System.ComponentModel.DataAnnotations;

namespace OpeningHours_Service.Dtos
{
    public class SpecialOpeningHoursDto
    {
        public int Id { get; set; }
        public DateTime Day { get; set; }
        [Required(ErrorMessage = "Nowa godzina rozpoczęcia jest wymagana.")]
        [Range(0, 23, ErrorMessage = "Nieprawidłowa godzina")]
        public int Start { get; set; }
        [Required(ErrorMessage = "Nowa godzina zamknięcia jest wymagana.")]
        [Range(0, 23, ErrorMessage = "Nieprawidłowa godzina")]
        public int End { get; set; }
        public String Description { get; set; }
    }
}