using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Reservation_Service.Data;
using Reservation_Service.Dtos;
using Reservation_Service.Helpers;
using Reservation_Service.Models;

namespace Reservation_Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly IReservationRepository _reservationRepo;
        private readonly IMapper _mapper;
        private const string ApiGatewayUrl = "https://localhost:5100";
        public ReservationController(IReservationRepository reservationRepo, IMapper mapper)
        {
            _reservationRepo = reservationRepo;
            _mapper = mapper;
        }
        [Authorize(Roles = "Customer,Employee")]
        [HttpGet]
        public async Task<IActionResult> GetReservations([FromQuery] ReservationParams reservationParams)
        {
            if (reservationParams.UserId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value) &&
             !(User.FindAll(ClaimTypes.Role).Any(r => r.Value == "Employee")))
                return Forbid(); //Non-employee users can only see their own reservations

            var reservations = await _reservationRepo.GetReservations(reservationParams);
            var reservationsToReturn = _mapper.Map<IEnumerable<ReservationForListDto>>(reservations);
            Response.AddPagination(reservations.CurrentPage, reservations.PageSize, reservations.TotalCount, reservations.TotalPages);
            return Ok(reservationsToReturn);
        }
        [HttpGet("{date}/{tableId}")]
        public async Task<IActionResult> GetTableReservations(DateTime date, int tableId)
        {
            var reservations = await _reservationRepo.getTableReservations(tableId, date);
            return Ok(_mapper.Map<IEnumerable<ReservationForScheduleDto>>(reservations));
        }
        [Authorize(Roles = "Customer,Employee")]
        [HttpPost("changeStatus/{id}")]
        public async Task<IActionResult> ChangeReservationStatus(int id, ReservationForChangeStatusDto reservationForChangeStatusDto)
        {
            var reservationToChangeStatus = await _reservationRepo.GetReservation(id);
            if (reservationToChangeStatus == null)
            {
                return NotFound($"Rezerwacja o numerze id: {id}, której status próbowałeś zmienić, nie istnieje");
            }


            if (!(User.FindAll(ClaimTypes.Role).Any(r => r.Value == "Employee")))
            {
                if (reservationForChangeStatusDto.ReservationStatus != ReservationStatus.Cancelled ||
                 reservationToChangeStatus.UserId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                {
                    return Forbid();//Non-employee users can only cancel reservations (only their own reservations)
                }
            }
            reservationToChangeStatus.ReservationStatus = reservationForChangeStatusDto.ReservationStatus;
            if (await _reservationRepo.SaveAll())
            {
                return NoContent();
            }
            throw new Exception($"Zmiana statusu rezerwacji o numerze {id} nie powiodło się.");
        }
        [Authorize(Roles = "Customer,Employee")]
        [HttpPost]
        public async Task<IActionResult> MakeReservation(ReservationsForAddDto reservationsForAddDto)
        {
            var reservationsToAdd = _mapper.Map<IEnumerable<Reservation>>(reservationsForAddDto.reservationsToAdd);
            if (reservationsForAddDto.UserId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value) &&
             !(User.FindFirst(ClaimTypes.Role).Value.Contains("Employee")))
                return Forbid();
            foreach (Reservation r in reservationsToAdd)
            {
                r.UserId = reservationsForAddDto.UserId;
                var validationResult = await ValidateReservationRequest(r);
                if (!validationResult.validationPassed)
                {
                    return BadRequest(validationResult.validationError);
                }
                r.ReservationStatus = ReservationStatus.Active;
            }
            _reservationRepo.AddReservations(reservationsToAdd);
            if (await _reservationRepo.SaveAll())
            {
                return Ok(_mapper.Map<IEnumerable<ReservationForListDto>>(reservationsToAdd));
            }
            throw new System.Exception("Nie udało się zapisać rezerwacji do bazy!");
        }
        private async Task<(bool validationPassed, string validationError)> ValidateReservationRequest(Reservation r)
        {
            if (r.Start.Minute % 15 != 0)
            {
                return (false, "Rezerwacja powinna zaczynać się od wielokrotnośći 15 minut!");
            }
            if (r.End.Minute % 15 != 0)
            {
                return (false, "Rezerwacja powinna kończyć się na wielokrotnośći 15 minut!");
            }
            if (r.End - r.Start < TimeSpan.FromMinutes(30))
            {
                return (false, "Rezerwacja nie może być krótsza niż 30 minut!");
            }
            var openingHours = await GetOpeningHours(r.Start.Date);
            if (openingHours == null)
            {
                return (false, "Rezerwacja musi być złożona na czynny dzień!");
            }
            if (!(r.Start.TimeOfDay >= openingHours.Value.openingHour && r.End.TimeOfDay <= openingHours.Value.closingHour))
            {
                return (false, "Rezerwacja wykracza poza godziny otwarcia lokalu");
            }
            if (!ValidateReservationSubmitTimeWindow(r.Start))
            {
                return (false, "Rezerwacja powinna być złożona nie wcześniej niż dwa tygodnie przed jej terminem oraz nie później niż na godzinę przed!");
            }
            if ((await GetTable(r.PingPongTableId.Value) == null))
            {
                return (false, "Dany stół nie istnieje!");
            }
            if (await _reservationRepo.IsReservationTaken(r))
            {
                return (false, "Rezerwacja już zajęta!");
            }
            return (true, null);
        }
        private bool ValidateReservationSubmitTimeWindow(DateTime start)
        {
            var timeDiffrence = start - DateTime.UtcNow;
            if (start < DateTime.UtcNow || timeDiffrence < TimeSpan.FromHours(1) || timeDiffrence.TotalDays > 14)
            {
                return false;
            }
            return true;
        }
        private async Task<(TimeSpan openingHour, TimeSpan closingHour)?> GetOpeningHours(DateTime day)
        {
            ActualOpeningHoursDto actualOpeningHours;
            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync($"{ApiGatewayUrl}/api/openinghours/actual/{day.Date}"))
                {
                    var openingHoursServiceAnswer = await response.Content.ReadAsStringAsync();
                    actualOpeningHours = JsonConvert.DeserializeObject<ActualOpeningHoursDto>(openingHoursServiceAnswer);
                }
            }
            if (!actualOpeningHours.IsOpen)
            {
                return null;
            }
            return (actualOpeningHours.Start, actualOpeningHours.End);
        }
        private async Task<TableDto> GetTable(int tableId)
        {
            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync($"{ApiGatewayUrl}/api/tables/{tableId}"))
                {
                    var openingHoursServiceAnswer = await response.Content.ReadAsStringAsync();
                    return JsonConvert.DeserializeObject<TableDto>(openingHoursServiceAnswer);
                }
            }
        }
    }
}