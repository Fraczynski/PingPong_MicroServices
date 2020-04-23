using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpeningHours_Service.Data;
using OpeningHours_Service.Models;

namespace OpeningHours_Service.Controllers
{
    [ApiController]
    [Authorize(Roles="Employee")]
    [Route("api/[controller]")]
    public class ClosingDaysController : ControllerBase
    {
        private readonly IClosingDaysRepository _repository;
        private readonly IMapper _mapper;
        public ClosingDaysController(IClosingDaysRepository repository, IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;
        }
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetClosingDays()
        {
            var closingDays=await _repository.GetAllClosingDays();
            return Ok(closingDays);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClosingDay(int id)
        {
            var closingDay=await _repository.GetClosingDay(id);
             if (closingDay == null)
            {
                return NotFound($"Nieczynny dnień o numerze id: {id}, który próbowałeś usunąć, już nie istnieje");
            }
            _repository.RemoveClosingDay(closingDay);
            if(await _repository.SaveAll())
            {
                return NoContent();
            }
            throw new Exception($"Nie udało się usunąć nieczynnego dnia o numerze id: {id}");
        }
        [HttpPost]
        public async Task<IActionResult> AddClosingDay(ClosingDay closingDay)
        {
            _repository.AddClosingDay(closingDay);
            if(await _repository.SaveAll())
            {
                return Ok(closingDay);
            }
            throw new Exception("Nie udało się dodać nieczynnego dnia!");
        }
        
    }
}