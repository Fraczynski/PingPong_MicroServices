using System.Collections.Generic;
using System.Threading.Tasks;
using Auth_Service.Helpers;
using Auth_Service.Models;

namespace Auth_Service.Data
{
    public interface IUserRepository
    {
        void Delete(User userToDelete);
        Task<bool> SaveAll();
        Task<PagedList<User>> GetUsers(UserParams userParams);
        Task<User> GetUser(int id);
        Task<IEnumerable<string>> GetUserRoles(int id);
        Task<IEnumerable<User>> GetInfo(List<int> idNumbers);
    }
}