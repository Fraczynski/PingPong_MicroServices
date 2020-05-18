using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using HomePageService.Data;
using HomePageService.Dtos;
using HomePageService.Models;

namespace TableReservationApplication.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Roles = "Employee")]
    [ApiController]
    public class AlertsController : ControllerBase
    {
        private readonly IAlertsRepository _repo;
        private readonly IMapper _mapper;
        public AlertsController(IAlertsRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAlerts()
        {
            return Ok(await _repo.GetAllAlerts());
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAlert(int id)
        {
            var alertToDelete = await _repo.GetAlert(id);
            if (alertToDelete == null)
            {
                return NotFound($"Powiadomienie o numerze id: {id} nie istnieje");
            }
            _repo.Remove(alertToDelete);
            if (await _repo.SaveAll())
            {
                return NoContent();
            }
            throw new Exception("Nie udało się usunąć powiadomienia!");
        }
        [HttpPost]
        public async Task<IActionResult> AddAlert(AlertDto alertDto)
        {
            var newAlert = _mapper.Map<Alert>(alertDto);
            _repo.AddAlert(newAlert);
            if (await _repo.SaveAll())
            {
                return Ok(newAlert);
            }
            throw new Exception("Nie udało się dodać powiadomienia");
        }
    }
}