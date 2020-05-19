using System;
using Reservation_Service.Models;

namespace Reservation_Service.Helpers
{
    public class ReservationParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 10;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }
        public DateTime? Start { get; set; }
        public int? UserId { get; set; }
        public ReservationStatus? ReservationStatus { get; set; }
        public int? PingPongTableId { get; set; }
        public string OrderBy { get; set; }
    }
}