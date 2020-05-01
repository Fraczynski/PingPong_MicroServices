using AutoMapper;
using OpeningHours_Service.Dtos;
using OpeningHours_Service.Models;
using System;

namespace OpeningHours_Service.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {

            CreateMap<OpeningHoursDto, OpeningHours>().ForMember(o => o.Start, Start => Start.MapFrom(Start => new TimeSpan(Start.Start, 0, 0))).ForMember(o => o.End, End => End.MapFrom(End => new TimeSpan(End.End, 0, 0)));
            CreateMap<OpeningHours, OpeningHoursDto>().ForMember(o => o.Start, Start => Start.MapFrom(Start => Start.Start.Hours)).ForMember(o => o.End, End => End.MapFrom(End => End.End.Hours));

            CreateMap<SpecialOpeningHours, SpecialOpeningHoursDto>().ForMember(o => o.Start, Start => Start.MapFrom(Start => Start.Start.Hours)).ForMember(o => o.End, End => End.MapFrom(End => End.End.Hours));
            CreateMap<SpecialOpeningHoursDto, SpecialOpeningHours>().ForMember(o => o.Start, Start => Start.MapFrom(Start => new TimeSpan(Start.Start, 0, 0))).ForMember(o => o.End, End => End.MapFrom(End => new TimeSpan(End.End, 0, 0)));

        }
    }
}