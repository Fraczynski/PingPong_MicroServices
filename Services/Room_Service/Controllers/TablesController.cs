using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Room_Service.Data;
using Room_Service.Dtos;
using Room_Service.Models;

namespace Room_Service.Controllers
{
    [Authorize(Roles = "Administrator")]
    [Route("api/[controller]")]
    [ApiController]
    public class TablesController : ControllerBase
    {
        private readonly ITablesRepository _repository;
        private readonly IMapper _mapper;

        public TablesController(ITablesRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        [AllowAnonymous]
        [HttpGet("{tableId}")]
        public async Task<IActionResult> GetTable(int tableId)
        {
            var table = await _repository.GetTable(tableId);
            return Ok(_mapper.Map<PingPongTableForReturnDto>(table));
        }

        [AllowAnonymous]
        [HttpGet("room/{roomId}/active")]
        public async Task<IActionResult> GetActiveTablesFromOneRoom(int roomId)
        {
            var tables = await _repository.GetActiveTablesWithRoomId(roomId);
            return Ok(_mapper.Map<IEnumerable<PingPongTableForReturnDto>>(tables));
        }
        [HttpGet("room/{roomId}")]
        public async Task<IActionResult> GetAllTablesFromOneRoom(int roomId)
        {
            var tables = await _repository.GetAllTablesWithRoomId(roomId);
            return Ok(_mapper.Map<IEnumerable<PingPongTableForReturnDto>>(tables));
        }

        [HttpPost]
        public async Task<IActionResult> SaveChanges(PingPongTablesForSaveChangesDto pingPongTables)
        {
            if (pingPongTables.TablesToDeleteIds != null)
            {
                //delete old
                foreach (var tableId in pingPongTables.TablesToDeleteIds)
                {
                    var tableFromRepo = await _repository.GetTable(tableId);
                    if (tableFromRepo == null)
                    {
                        return NotFound($"Stół o numerze id: {tableId},który próbowałeś usunąć, już nie istnieje");
                    }
                    _repository.Remove(tableFromRepo);
                }
            }

            //add new
            var newTables = _mapper.Map<IEnumerable<PingPongTable>>(pingPongTables.TablesToAdd);
            _repository.AddTables(newTables);

            if (pingPongTables.TablesToUpdate != null)
            {
                //update old
                foreach (var table in pingPongTables.TablesToUpdate)
                {
                    var tableFromRepo = await _repository.GetTable(table.Id);
                    if (tableFromRepo == null)
                    {
                        return NotFound($"Stół o numerze id: {table.Id},który próbowałeś zaaktualizować, już nie istnieje");
                    }
                    _mapper.Map(table, tableFromRepo);
                }
            }

            //save changes
            if (await _repository.SaveAll())
            {
                return Ok(_mapper.Map<IEnumerable<PingPongTableForReturnDto>>(newTables));
            }
            throw new Exception("Zapisanie zmian nie powiodło się");
        }
    }
}