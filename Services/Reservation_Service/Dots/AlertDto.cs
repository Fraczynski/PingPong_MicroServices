using Reservation_Service.Models;

namespace Reservation_Service.Dtos
{
    public class AlertDto
    {
        public string Message { get; set; }
        public AlertType AlertType { get; set; }
    }
}