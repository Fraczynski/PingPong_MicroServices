using AutoMapper;
using Reservation_Service.Dtos;
using Reservation_Service.Models;

namespace Reservation_Service.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<ReservationForAddDto, Reservation>();
            CreateMap<Reservation, ReservationForScheduleDto>();
            CreateMap<Reservation, ReservationForListDto>();
        }
    }
}