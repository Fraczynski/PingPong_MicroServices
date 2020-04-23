using System.Threading.Tasks;
using Reservation_Service.Models;

namespace Reservation_Service.Services
{
    public interface IReservationService
    {
        Task<(bool isValid, string errorMessage)> ValidateReservationRequest(Reservation r);
    }
}