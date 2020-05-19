namespace Room_Service.Models
{
    public class PingPongTable
    {
        public int Id { get; set; }
        public string Label { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public double TableLength { get; set; }
        public double TableWidth { get; set; }
        public bool VerticalOrientation { get; set; }
        public Room Room { get; set; }
        public int RoomId { get; set; }
        public bool Active { get; set; }
    }
}