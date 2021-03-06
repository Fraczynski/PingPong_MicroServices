using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Auth_Service.Helpers;
using Auth_Service.Models;
using Microsoft.EntityFrameworkCore;

namespace Auth_Service.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }
        public void Delete(User userToDelete)
        {
            _context.Remove(userToDelete);
        }
        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }
        public async Task<IEnumerable<string>> GetUserRoles(int id)
        {
            var userRoles = from u in _context.Users
                            join ur in _context.UserRoles
                            on u.Id equals ur.UserId
                            join r in _context.Roles
                            on ur.RoleId equals r.Id
                            where u.Id == id
                            select new string(r.Name);

            return await userRoles.ToListAsync();
        }
        public async Task<IEnumerable<User>> GetInfo(List<int> idNumbers)
        {
            var users = await _context.Users.OrderBy(u => u.Id).Where(u => idNumbers.Contains(u.Id)).ToListAsync();

            return users;
        }
        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var users = _context.Users.Include(x => x.UserRoles).ThenInclude(y => y.Role).OrderBy(u => u.Id).AsQueryable();
            if (userParams.Active != null)
            {
                users = users.Where(u => u.Active == userParams.Active);
            }
            if (!string.IsNullOrEmpty(userParams.FirstName))
            {
                users = users.Where(u => u.FirstName.ToLower().Contains(userParams.FirstName.ToLower()));
            }
            if (!string.IsNullOrEmpty(userParams.Role))
            {
                users = users.Where(u => u.UserRoles.Any(r => string.Compare(r.Role.Name, userParams.Role) == 0));
            }
            if (!string.IsNullOrEmpty(userParams.LastName))
            {
                users = users.Where(u => u.LastName.ToLower().Contains(userParams.LastName.ToLower()));
            }
            if (!string.IsNullOrEmpty(userParams.Email))
            {
                users = users.Where(u => u.Email.ToLower().Contains(userParams.Email.ToLower()));
            }
            if (userParams.Id != null)
            {
                users = users.Where(u => u.Id == userParams.Id);
            }

            if (!string.IsNullOrEmpty(userParams.OrderBy))
            {
                switch (userParams.OrderBy)
                {
                    case "lastName":
                        {
                            users = users.OrderBy(u => u.LastName);
                            break;
                        }
                    default:
                        {
                            users = users.OrderBy(u => u.Id);
                            break;
                        }
                }
            }
            return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        }
        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}