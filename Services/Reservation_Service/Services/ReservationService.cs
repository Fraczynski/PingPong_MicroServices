using System;
using System.Threading.Tasks;
using Reservation_Service.Data;
using Reservation_Service.Helpers;
using Reservation_Service.Models;

namespace Reservation_Service.Services
{
    public class ReservationService : IReservationService
    {
        private readonly IReservationRepository _reservationRepo;
        private readonly IOpeningHoursRepository _openingHoursRepo;
        private readonly IClosingDaysRepository _closingDaysRepo;
        private readonly ITablesRepository _tablesRepo;
        private readonly IDateTimeHelper _dateTimeHelper;
        public ReservationService(IDateTimeHelper dateTimeHelper, IReservationRepository reservationRepo, IOpeningHoursRepository openingHoursRepo, IClosingDaysRepository closingDaysRepo, ITablesRepository tablesRepo)
        {
            _dateTimeHelper = dateTimeHelper;
            _tablesRepo = tablesRepo;
            _closingDaysRepo = closingDaysRepo;
            _openingHoursRepo = openingHoursRepo;
            _reservationRepo = reservationRepo;
        }
        private bool ValidateReservationSubmitTimeWindow(DateTime start)
        {
            var timeDiffrence = start - _dateTimeHelper.GetDateTimeNow();
            if (start < _dateTimeHelper.GetDateTimeNow() || timeDiffrence < TimeSpan.FromHours(1) || timeDiffrence.TotalDays > 14)
            {
                return false;
            }
            return true;
        }

        private async Task<bool> CheckIfOpen(DateTime dayOfReservations)
        {
            if (!await _openingHoursRepo.IsOpenInThisDay(dayOfReservations.DayOfWeek) || await _closingDaysRepo.IsInClosedDays(dayOfReservations))
            {
                return false;
            }
            return true;
        }

        public async Task<(bool isValid,string errorMessage)> ValidateReservationRequest(Reservation r)
        {
            if (r.Start.Minute != 0)
            {
                return (false, "Rezerwacja powinna zaczynac się od pełnej godziny!");
            }
            if (!await CheckIfOpen(r.Start.Date))
            {
                return (false, "Rezerwacja nie może być złożona w nieczynny dzień!");
            }
            var openingHours = await _openingHoursRepo.GetActualOpeningHours(r.Start.Date);
            var openingHour = openingHours.Item1;
            var closingHour = openingHours.Item2;
            if (r.Start.Hour < openingHour || r.Start.Hour > closingHour - 1)
            {
                return (false, "Rezerwacja wykracza poza godziny otwarcia!");
            }
            if (!ValidateReservationSubmitTimeWindow(r.Start))
            {
                return (false, "Rezerwacja powinna być złożona nie wcześniej niż dwa tygodnie przed jej terminem oraz nie później niż na godzinę przed!");
            }
            var table = await _tablesRepo.GetTable(r.PingPongTableId);
            if (!table.AvailableForReservations)
            {
                return (false, "Nie można stworzyć rezerwacji na nieczynny stół!");
            }
            if (await _reservationRepo.IsReservationTaken(r))
            {
                return (false, "Rezerwacja już zajęta!");
            }
            return (true, null);
        }
    }
}