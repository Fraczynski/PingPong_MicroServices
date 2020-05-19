using System.Collections.Generic;
using System.Threading.Tasks;
using HomePageService.Models;

namespace HomePageService.Data
{
    public interface IAlertsRepository
    {
        Task<IEnumerable<Alert>> GetAllAlerts();

        Task<Alert> GetAlert(int id);

        void AddAlert(Alert alert);

        void Remove(Alert alert);

        Task<bool> SaveAll();
    }
}