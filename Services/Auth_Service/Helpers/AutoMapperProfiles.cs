using Auth_Service.Dtos;
using Auth_Service.Models;
using AutoMapper;

namespace Auth_Service.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForReturnDto>();
            CreateMap<User, UserForListDto>();
            CreateMap<Role, RoleDto>();
            CreateMap<RoleDto, Role>();
        }
    }
}