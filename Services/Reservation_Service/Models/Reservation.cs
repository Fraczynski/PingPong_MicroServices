using System;

namespace Reservation_Service.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public PingPongTable PingPongTable { get; set; }
        public int PingPongTableId { get; set; }
        public DateTime Start { get; set; }
    }
}