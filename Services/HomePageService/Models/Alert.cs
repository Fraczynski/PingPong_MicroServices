namespace HomePageService.Models
{
    public class Alert
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public AlertType AlertType { get; set; }
    }
    public enum AlertType{
        Warning,Information
    };  
}