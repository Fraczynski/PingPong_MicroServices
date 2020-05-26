using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Reservation_Service.Data;
using Reservation_Service.Dtos;
using Reservation_Service.Models;

namespace Reports_Service.Controllers
{
    [Authorize(Roles = "Employee")]
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly IReportsRepository _repository;

        public ReportsController(IReportsRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult GetReport([FromQuery] ReportParams reportParams)
        {
            var report = _repository.GetReport(reportParams);

            return Ok(report);
        }
    }
}