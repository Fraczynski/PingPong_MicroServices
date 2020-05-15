using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Auth_Service.Data;
using Auth_Service.Dtos;
using Auth_Service.Helpers;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Auth_Service.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _repository;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository repostiory, IMapper mapper)
        {
            _repository = repostiory;
            _mapper = mapper;
        }

        [Authorize(Roles = "Administrator,Employee")]
        [HttpGet]
        public async Task<IActionResult> GetUsers([FromQuery] UserParams userParams)
        {
            var users = await _repository.GetUsers(userParams);
            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);
            foreach (var user in usersToReturn)
            {
                user.Role = await _repository.GetUserRole(user.Id);
            }
            Response.AddPagination(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);

            return Ok(usersToReturn);
        }
        [HttpGet("{id}", Name = "GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)
            && !(User.FindFirst(ClaimTypes.Role).Value.Contains("Employee")
            || (User.FindFirst(ClaimTypes.Role).Value.Contains("Administrator"))))
                return Forbid();

            var user = await _repository.GetUser(id);
            if (user == null)
            {
                return NotFound($"Użytkownik o numerze id: {id} nie istnieje");
            }
            var userToReturn = _mapper.Map<UserForReturnDto>(user);

            return Ok(userToReturn);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value) &&
             !(User.FindFirst(ClaimTypes.Role).Value.Contains("Employee")
             || (User.FindFirst(ClaimTypes.Role).Value.Contains("Administrator"))))
                return Forbid();

            var userToDelete = await _repository.GetUser(id);
            if (userToDelete == null)
            {
                return NotFound($"Użytkownik o numerze id: {id} nie istnieje");
            }
            _repository.Delete(userToDelete);

            if (await _repository.SaveAll())
            {
                return NoContent();
            }
            throw new Exception($"Usunięcie użytkownika o numerze {id} nie powiodło się");
        }
    }
}