using Room_Service.Models;

namespace Room_Service.Dtos
{
    public class RoomForAddDto
    {
        public string Name { get; set; }
        public double RoomWidth { get; set; }
        public double RoomLength { get; set; }
        public bool Active { get; set; }
    }
}