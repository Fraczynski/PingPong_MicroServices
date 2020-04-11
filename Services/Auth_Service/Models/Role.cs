using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Auth_Service.Models
{
    public class Role:IdentityRole<int>
    {
        public ICollection<UserRole> UserRoles { get; set; }
    }
}