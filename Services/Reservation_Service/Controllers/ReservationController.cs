using System;
using System.Collections.Generic;
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
        public ReservationController(IReservationRepository reservationRepo, IMapper mapper)
        {
            _reservationRepo = reservationRepo;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllReservations([FromQuery]ReservationParams reservationParams)
        {
            var reservations = await _reservationRepo.GetAllReservations(reservationParams);
            var reservationsToReturn = _mapper.Map<IEnumerable<ReservationForListDto>>(reservations);
            foreach (var reservation in reservationsToReturn)
            {
                reservation.PingPongTableLabel = (await GetTable(reservation.PingPongTableId)).Label;
            }
            Response.AddPagination(reservations.CurrentPage, reservations.PageSize, reservations.TotalCount, reservations.TotalPages);
            return Ok(reservationsToReturn);
        }

        [HttpGet("{date}/{tableId}")]
        public async Task<IActionResult> GetTableReservations(DateTime date, int tableId)
        {
            var reservations = await _reservationRepo.getTableReservations(tableId, date);
            return Ok(_mapper.Map<IEnumerable<ReservationForScheduleDto>>(reservations));
        }
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserReservations(int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value) && !User.FindFirst(ClaimTypes.Role).Value.Equals("Employee"))
                return Forbid();
            var reservations = await _reservationRepo.getUserReservations(userId);
            var reservationsToReturn = _mapper.Map<IEnumerable<ReservationForListDto>>(reservations);
            foreach (var reservation in reservationsToReturn)
            {
                reservation.PingPongTableLabel = (await GetTable(reservation.PingPongTableId)).Label;
            }
            return Ok(reservationsToReturn);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReservation(int id)
        {
            var reservationToDelete = await _reservationRepo.GetReservation(id);
            if (reservationToDelete == null)
            {
                return NotFound($"Rezerwacja o numerze id: {id}, którą próbowałeś usunąć, już nie istnieje");
            }
            if (reservationToDelete.UserId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value) && !User.FindFirst(ClaimTypes.Role).Value.Equals("Employee"))
                return Forbid();
            _reservationRepo.DeleteReservation(reservationToDelete);
            if (await _reservationRepo.SaveAll())
            {
                return NoContent();
            }
            throw new Exception($"Usunięcie rezerwacji o numerze {id} nie powiodło się.");
        }
        [HttpPost]
        public async Task<IActionResult> MakeReservation(IEnumerable<ReservationForAddDto> reservationsForAddDto)
        {
            var userWhoRequestedId = 1;//int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var reservationsToAdd = _mapper.Map<IEnumerable<Reservation>>(reservationsForAddDto);

            foreach (Reservation r in reservationsToAdd)
            {
                r.UserId = userWhoRequestedId;
                var validationResult = await ValidateReservationRequest(r);
                if (!validationResult.Item1)
                {
                    return BadRequest(validationResult.Item2);
                }
            }
            _reservationRepo.AddReservations(reservationsToAdd);
            if (await _reservationRepo.SaveAll())
            {
                return Ok(_mapper.Map<IEnumerable<ReservationForListDto>>(reservationsToAdd));
            }
            throw new System.Exception("Nie udało się zapisać rezerwacji do bazy!");
        }
        private bool ValidateReservationSubmitTimeWindow(DateTime start)
        {
            var timeDiffrence = start - DateTime.Now;
            if (start < DateTime.Now || timeDiffrence < TimeSpan.FromHours(1) || timeDiffrence.TotalDays > 14)
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
                using (var response = await httpClient.GetAsync($"http://localhost:5100/api/openinghours/actual/{day.Date}"))
                {
                    var openingHoursServiceAnswer = await response.Content.ReadAsStringAsync();
                    actualOpeningHours = JsonConvert.DeserializeObject<ActualOpeningHoursDto>(openingHoursServiceAnswer);
                }
            }
            if (!actualOpeningHours.IsOpen)
            {
                return null;
            }
            return (new TimeSpan(actualOpeningHours.Start, 0, 0), new TimeSpan(actualOpeningHours.End, 0, 0));
        }
        private async Task<TableDto> GetTable(int tableId)
        {
            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync($"http://localhost:5100/api/tables/{tableId}"))
                {
                    var openingHoursServiceAnswer = await response.Content.ReadAsStringAsync();
                    return JsonConvert.DeserializeObject<TableDto>(openingHoursServiceAnswer);
                }
            }
        }
        private async Task<(bool, string)> ValidateReservationRequest(Reservation r)
        {
            if (r.Start.Minute % 15 != 0)//wielokrotność 15
            {
                return (false, "Rezerwacja powinna zaczynać się od wielokrotnośći 15 minut!");
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
            if (GetTable(r.PingPongTableId) == null)
            {
                return (false, "Dany stół nie istnieje!");
            }
            if (await _reservationRepo.IsReservationTaken(r))
            {
                return (false, "Rezerwacja już zajęta!");
            }
            return (true, null);
        }
    }
}