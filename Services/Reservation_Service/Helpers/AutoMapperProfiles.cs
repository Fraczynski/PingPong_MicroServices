using AutoMapper;
using Reservation_Service.Dtos;
using Reservation_Service.Models;
using System;

namespace Reservation_Service.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<UserForRegisterDto, User>();
            CreateMap<UserForUpdatePersonalDataDto, User>();
            CreateMap<UserStatsDto, User>();
            CreateMap<User, UserStatsDto>();
            CreateMap<User, UserForReturnDto>();
            CreateMap<User, UserForListDto>();

            CreateMap<ReservationForAddDto,Reservation>();
            CreateMap<Reservation, ReservationForScheduleDto>();
            CreateMap<Reservation, ReservationForListDto>();

            CreateMap<PingPongTableForAddDto, PingPongTable>();
            CreateMap<PingPongTableForUpdateDto, PingPongTable>();
            CreateMap<PingPongTable, PingPongTableForReturnDto>();

            CreateMap<RoomForUpdateDto, Room>();
            CreateMap<RoomForAddDto, Room>();
            CreateMap<Room, RoomForReturnDto>();

            CreateMap<Role, RoleDto>();
            CreateMap<RoleDto, Role>();

            CreateMap<AlertDto, Alert>();

            CreateMap<OpeningHoursDto, OpeningHours>().ForMember(o => o.Start, Start => Start.MapFrom(Start => new TimeSpan(Start.Start, 0, 0))).ForMember(o => o.End, End => End.MapFrom(End => new TimeSpan(End.End, 0, 0)));
            CreateMap<OpeningHours, OpeningHoursDto>().ForMember(o => o.Start, Start => Start.MapFrom(Start => Start.Start.Hours)).ForMember(o => o.End, End => End.MapFrom(End => End.End.Hours));

            CreateMap<SpecialOpeningHours, SpecialOpeningHoursDto>().ForMember(o => o.Start, Start => Start.MapFrom(Start => Start.Start.Hours)).ForMember(o => o.End, End => End.MapFrom(End => End.End.Hours));
            CreateMap<SpecialOpeningHoursDto, SpecialOpeningHours>().ForMember(o => o.Start, Start => Start.MapFrom(Start => new TimeSpan(Start.Start, 0, 0))).ForMember(o => o.End, End => End.MapFrom(End => new TimeSpan(End.End, 0, 0)));

            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();
        }
    }
}