using System.ComponentModel.DataAnnotations;

namespace Auth_Service.Dtos
{
    public class LoginDto
    {
        [Required(ErrorMessage="Pole e-mail jest wymagane.")]
        public string Email { get; set; }
        [Required(ErrorMessage="Pole hasło jest wymagane.")]
        public string Password { get; set; }
    }
}