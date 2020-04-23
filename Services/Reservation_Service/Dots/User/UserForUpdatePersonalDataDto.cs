using System.ComponentModel.DataAnnotations;

namespace Reservation_Service.Dtos
{
    public class UserForUpdatePersonalDataDto
    {
        [Required(ErrorMessage="Pole imię jest wymagane")]
        public string FirstName { get; set; }
        [Required(ErrorMessage="Pole nazwisko jest wymagane")]
        public string LastName { get; set; }
    }
}