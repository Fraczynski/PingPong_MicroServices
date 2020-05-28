using System.Collections.Generic;
using System.Threading.Tasks;
using Reservation_Service.Dtos;
using Reservation_Service.Models;

namespace Reservation_Service.Data
{
    public interface IReportsRepository
    {
        List<(string, int)> GetReport(ReportParams reportParams);
    }
}