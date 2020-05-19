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

            CreateMap<OpeningHoursDto, OpeningHours>();
            CreateMap<OpeningHours, OpeningHoursDto>();

            CreateMap<SpecialOpeningHours, SpecialOpeningHoursDto>();
            CreateMap<SpecialOpeningHoursDto, SpecialOpeningHours>();

        }
    }
}