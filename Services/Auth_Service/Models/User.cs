using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Auth_Service.Models
{
    public class User : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public ICollection<UserRole> UserRoles{get;set;}
    }
}