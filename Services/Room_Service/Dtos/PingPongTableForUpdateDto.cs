using Room_Service.Models;

namespace Room_Service.Dtos
{
    public class PingPongTableForUpdateDto
    {
        public int Id { get; set; }
        public string Label { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public double TableLength { get; set; }
        public double TableWidth { get; set; }
        public bool VerticalOrientation { get; set; }
        public int RoomId { get; set; }
        public bool Active { get; set; }
    }
}