using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Reservation_Service.Models
{
    public class User : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int ConfirmedReservationsAmount { get; set; }
        public int UnconfirmedReservationsAmount { get; set; }
        public ICollection<Reservation> Reservations { get; set; }
        public ICollection<UserRole> UserRoles{get;set;}
    }
}