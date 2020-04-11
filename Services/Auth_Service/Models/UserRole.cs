using Microsoft.AspNetCore.Identity;

namespace Auth_Service.Models
{
    public class UserRole : IdentityUserRole<int>
    {
        public User User { get; set; }
        public Role Role { get; set; }
    }
}