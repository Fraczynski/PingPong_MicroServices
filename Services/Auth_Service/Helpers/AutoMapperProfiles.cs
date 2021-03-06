using Auth_Service.Dtos;
using Auth_Service.Models;
using AutoMapper;

namespace Auth_Service.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>();
            CreateMap<User, UserForInfoDto>();
            CreateMap<Role, RoleDto>();
            CreateMap<RoleDto, Role>();
        }
    }
}