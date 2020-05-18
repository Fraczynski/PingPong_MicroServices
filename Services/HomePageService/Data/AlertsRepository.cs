using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using HomePageService.Models;

namespace HomePageService.Data
{
    public class AlertsRepository :IAlertsRepository
    {
        private readonly DataContext _context;
        public AlertsRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Alert>> GetAllAlerts()
        {
            return await _context.Alerts.ToListAsync();
        }
        public async Task<Alert> GetAlert(int id)
        {
            return await _context.Alerts.FirstOrDefaultAsync(a=>a.Id==id);
        }
        public void AddAlert(Alert alert)
        {
            _context.Alerts.Add(alert);
        }
        public void Remove(Alert alert)
        {
            _context.Remove(alert);
        }
        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync()>0;
        }
    }
}