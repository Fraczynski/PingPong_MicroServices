using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpeningHours_Service.Data;
using OpeningHours_Service.Dtos;
using OpeningHours_Service.Models;

namespace OpeningHours_Service.Controllers
{
    //[Authorize(Roles = "Employee")]
    [ApiController]
    [Route("api/[controller]")]
    public class OpeningHoursController : ControllerBase
    {
        private readonly IOpeningHoursRepository _repository;
        private readonly IMapper _mapper;
        public OpeningHoursController(IOpeningHoursRepository repository, IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;
        }
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAllOpeningHours()
        {
            var openingHours = await _repository.GetAllOpeningHours();
            return Ok(_mapper.Map<IEnumerable<OpeningHoursDto>>(openingHours));
        }
        [HttpGet("special")]
        public async Task<IActionResult> GetAllSpecialOpeningHours()
        {
            var openingHours = await _repository.GetAllSpecialOpeningHours();
            return Ok(_mapper.Map<IEnumerable<SpecialOpeningHoursDto>>(openingHours));
        }
        [AllowAnonymous]
        [HttpGet("{dayOfWeek}")]
        public async Task<IActionResult> GetOpeningHours(DayOfWeek dayOfWeek)
        {
            var specialOpeningHours = await _repository.GetOpeningHours(dayOfWeek);
            return Ok(_mapper.Map<OpeningHoursDto>(specialOpeningHours));
        }

        [AllowAnonymous]
        [HttpGet("special/{dayString}")]
        public async Task<IActionResult> GetSpecialOpeningHours(string dayString)
        {
            var day = DateTime.Parse(dayString);
            var specialOpeningHours = await _repository.GetSpecialOpeningHours(day);
            return Ok(_mapper.Map<SpecialOpeningHoursDto>(specialOpeningHours));
        }
        [HttpPost]
        public async Task<IActionResult> ChangeOpeningHours(IEnumerable<OpeningHoursDto> openingHoursDto)
        {
            foreach (var openingHours in openingHoursDto)
            {
                if (openingHours.Start >= openingHours.End)
                {
                    return BadRequest("Niepoprawne godziny pracy");
                }
                var openingHoursFromRepo = await _repository.GetOpeningHours(openingHours.DayOfWeek);
                _mapper.Map(openingHours, openingHoursFromRepo);
            }
            if (await _repository.SaveAll())
            {
                return NoContent();
            }
            throw new Exception("Nie udało się zmienić godzin otwarcia");
        }
        [HttpPost("special")]
        public async Task<IActionResult> AddSpecialOpeningHours(SpecialOpeningHoursDto specialOpeningHoursDto)
        {
            if (specialOpeningHoursDto.Start >= specialOpeningHoursDto.End)
            {
                return BadRequest("Niepoprawne godziny pracy");
            }
            var specialOpeningHours = _mapper.Map<SpecialOpeningHours>(specialOpeningHoursDto);
            _repository.AddSpecialOpeningHours(specialOpeningHours);
            if (await _repository.SaveAll())
            {
                return Ok(_mapper.Map<SpecialOpeningHoursDto>(specialOpeningHours));
            }
            throw new Exception("Nie udało się dodać wyjątkowych godzin otwarcia!");
        }
        [HttpDelete("special/{id}")]
        public async Task<IActionResult> DeleteSpecialOpeningHours(int id)
        {
            var specialOpeningHours = await _repository.GetSpecialOpeningHours(id);
            if (specialOpeningHours == null)
            {
                return NotFound($"Wyjątkowe godziny otwarcia o numerze id: {id}, które próbowałeś usunąć, już nie istnieją");
            }
            _repository.RemoveSpecialOpeningHours(specialOpeningHours);
            if (await _repository.SaveAll())
            {
                return NoContent();
            }
            throw new Exception($"Nie udalo się usunąć wyjątkowych godzin otwarcia o numerze id: {id}!");
        }
    }

}