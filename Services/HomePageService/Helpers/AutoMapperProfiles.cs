using AutoMapper;
using HomePageService.Dtos;
using HomePageService.Models;
using System;

namespace HomePageService.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AlertDto, Alert>();

           
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();
        }
    }
}