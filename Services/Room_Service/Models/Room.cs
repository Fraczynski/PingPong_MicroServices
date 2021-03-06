using System.Collections.Generic;

namespace Room_Service.Models
{
    public class Room
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double RoomWidth { get; set; }
        public double RoomLength { get; set; }
        public ICollection<PingPongTable> PingPongTables { get; set; }
        public bool Active { get; set; }
    }
}