using AutoMapper;
using Room_Service.Dtos;
using Room_Service.Models;

namespace Room_Service.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<PingPongTableForAddDto, PingPongTable>();
            CreateMap<PingPongTableForUpdateDto, PingPongTable>();
            CreateMap<PingPongTable, PingPongTableForReturnDto>();
            CreateMap<PingPongTable, TableForInfoDto>();

            CreateMap<RoomForUpdateDto, Room>();
            CreateMap<RoomForAddDto, Room>();
            CreateMap<Room, RoomForReturnDto>();
        }
    }
}