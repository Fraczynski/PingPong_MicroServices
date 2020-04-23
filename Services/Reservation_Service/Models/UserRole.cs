using Microsoft.AspNetCore.Identity;

namespace Reservation_Service.Models
{
    public class UserRole : IdentityUserRole<int>
    {
        public User User { get; set; }
        public Role Role { get; set; }
    }
}