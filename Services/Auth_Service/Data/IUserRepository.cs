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
        Task<string> GetUserRole(int id);
    }
}