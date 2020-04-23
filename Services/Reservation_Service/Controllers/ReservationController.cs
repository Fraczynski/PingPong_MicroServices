using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Reservation_Service.Data;
using Reservation_Service.Dtos;
using Reservation_Service.Helpers;
using Reservation_Service.Models;
using Reservation_Service.Services;

namespace TableReservationApplication.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IReservationRepository _reservationRepo;
        private readonly IReservationService _reservationService;
        public ReservationController(IReservationRepository reservationRepo, IMapper mapper, IReservationService reservationService)
        {
            _reservationService = reservationService;
            _reservationRepo = reservationRepo;
            _mapper = mapper;
        }
        [Authorize(Roles = "Employee")]
        [HttpGet]
        public async Task<IActionResult> GetAllReservations([FromQuery]ReservationParams reservationParams)
        {
            var reservations = await _reservationRepo.GetAllReservations(reservationParams);
            var reservationsToReturn = _mapper.Map<IEnumerable<ReservationForListDto>>(reservations);
            foreach (var reservation in reservationsToReturn)
            {
                reservation.PingPongTableLabel = await _reservationRepo.GetTableLabel(reservation.PingPongTableId);
            }
            Response.AddPagination(reservations.CurrentPage, reservations.PageSize, reservations.TotalCount, reservations.TotalPages);
            return Ok(reservationsToReturn);
        }
        [AllowAnonymous]
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
                reservation.PingPongTableLabel = await _reservationRepo.GetTableLabel(reservation.PingPongTableId);
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
            var reservationsToAdd = _mapper.Map<IEnumerable<Reservation>>(reservationsForAddDto);
            foreach (Reservation r in reservationsToAdd)
            {
                r.UserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
                var validationResult = await _reservationService.ValidateReservationRequest(r);
                if (!validationResult.isValid)
                {
                    return BadRequest(validationResult.errorMessage);
                }
            }
            _reservationRepo.AddReservations(reservationsToAdd);
            if (await _reservationRepo.SaveAll())
            {
                return Ok(_mapper.Map<IEnumerable<ReservationForListDto>>(reservationsToAdd));
            }
            throw new System.Exception("Nie udało się zapisać rezerwacji do bazy!");
        }
    }
}