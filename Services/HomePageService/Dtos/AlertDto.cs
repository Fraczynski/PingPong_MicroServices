using HomePageService.Models;

namespace HomePageService.Dtos
{
    public class AlertDto
    {
        public string Message { get; set; }
        public AlertType AlertType { get; set; }
    }
}