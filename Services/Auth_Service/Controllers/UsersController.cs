using System;
using System.Collections.Generic;
using System.Linq;
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

        [Authorize(Roles = "Employee")]
        [HttpGet]
        public async Task<IActionResult> GetUsers([FromQuery] UserParams userParams)
        {
            var users = await _repository.GetUsers(userParams);
            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);
            foreach (var user in usersToReturn)
            {
                user.Roles = await _repository.GetUserRoles(user.Id);
            }
            Response.AddPagination(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);

            return Ok(usersToReturn);
        }
        [Authorize]
        [HttpPatch("{id}")]
        public async Task<IActionResult> ChangeUserAccountStatus(int id, UserForChangeStatusDto changeStatusDto)
        {
            if (!(User.FindAll(ClaimTypes.Role).Any(r => r.Value == "Administrator")))
            {
                if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value) || changeStatusDto.NewStatus != false)
                {
                    return Forbid(); //Non-administrator users can only deactivate their own accounts
                }
            }
            var userToDelete = await _repository.GetUser(id);
            if (userToDelete == null)
            {
                return NotFound($"Użytkownik o numerze id: {id} nie istnieje");
            }
            userToDelete.Active = changeStatusDto.NewStatus;

            if (await _repository.SaveAll())
            {
                return NoContent();
            }
            throw new Exception($"Usunięcie użytkownika o numerze {id} nie powiodło się");
        }
    }
}