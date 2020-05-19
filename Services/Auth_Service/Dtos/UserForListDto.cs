using System.Collections.Generic;

namespace Auth_Service.Dtos
{
    public class UserForListDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public IEnumerable<string> Roles { get; set; }
        public bool Active { get; set; }
    }
}