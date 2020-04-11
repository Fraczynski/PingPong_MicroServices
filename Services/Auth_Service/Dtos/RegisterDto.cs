using System.ComponentModel.DataAnnotations;

namespace Auth_Service.Dtos
{
    public class RegisterDto
    {
        [Required(ErrorMessage="Pole e-mail jest wymagane.")]
        [EmailAddress(ErrorMessage="Nieprawidłowy adres e-mail.")]
        public string Email { get; set; }
        [Required(ErrorMessage="Pole hasło jest wymagane.")]
        [StringLength(16, MinimumLength = 4, ErrorMessage = "Hasło musi zawierać od 4 do 16 znaków.")]
        public string Password { get; set; }
        [Required(ErrorMessage="Pole imię jest wymagane")]
        public string FirstName { get; set; }
        [Required(ErrorMessage="Pole nazwisko jest wymagane")]
        public string LastName { get; set; }
    }
}