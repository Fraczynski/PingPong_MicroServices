using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Room_Service.Data;
using Room_Service.Models;
using Room_Service.Dtos;

namespace Room_Service.Controllers
{
    [Authorize(Roles = "Administrator")]
    [Route("api/[controller]")]
    [ApiController]
    public class RoomsController : ControllerBase
    {
        private readonly IRoomsRepository _repository;
        private readonly IMapper _mapper;

        public RoomsController(IRoomsRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> AddRoom(RoomForAddDto roomForAddDto)
        {
            var room = _mapper.Map<Room>(roomForAddDto);
            _repository.Add(room);
            if (await _repository.SaveAll())
            {
                return Ok(_mapper.Map<RoomForReturnDto>(room));
            }
            throw new Exception("Nie udało się dodać pokoju");
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetRooms()
        {
            var tables = await _repository.GetAllRooms();
            return Ok(_mapper.Map<List<RoomForReturnDto>>(tables));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRoom(int id, RoomForUpdateDto roomDto)
        {
            var roomFromRepo = await _repository.GetRoom(id);
            if (roomFromRepo == null)
            {
                return NotFound($"Sala o numerze id: {id}, którą próbowałeś zaaktualizować, już nie istnieje");
            }
            _mapper.Map(roomDto, roomFromRepo);
            if (await _repository.SaveAll())
            {
                return NoContent();
            }
            throw new Exception("Nie udało się zaaktualizować stołu");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoom(int id)
        {
            var roomToDelete = await _repository.GetRoom(id);
            if (roomToDelete == null)
            {
                return NotFound($"Sala o numerze id: {id}, którą próbowałeś usunąć, już nie istnieje");
            }
            _repository.Remove(roomToDelete);
            if (await _repository.SaveAll())
            {
                return NoContent();
            }
            throw new Exception("Nie udało się usunąć sali");
        }
    }
}