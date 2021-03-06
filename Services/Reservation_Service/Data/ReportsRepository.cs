using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Reservation_Service.Dtos;
using Reservation_Service.Models;

namespace Reservation_Service.Data
{
    public class ReportsRepository : IReportsRepository
    {
        private readonly DataContext _context;
        public ReportsRepository(DataContext context)
        {
            _context = context;
        }

        public List<(string, int)> GetReport(ReportParams reportParams)
        {
            var reservations = _context.Reservations.AsQueryable();

            reservations = Filter(reservations, reportParams);

            return CreateStatistics(reportParams.Type, reservations.ToList());
        }

        private IQueryable<Reservation> Filter(IQueryable<Reservation> reservations, ReportParams reportParams)
        {
            if (reportParams.UserId != null)
            {
                reservations = reservations.Where(e => e.UserId == reportParams.UserId);
            }
            if (reportParams.PingPongTableId != null)
            {
                reservations = reservations.Where(r => r.PingPongTableId == reportParams.PingPongTableId);
            }
            if (reportParams.MinDate != null)
            {
                reservations = reservations.Where(r => r.Start >= reportParams.MinDate);
            }
            if (reportParams.MaxDate != null)
            {
                reservations = reservations.Where(r => r.End <= reportParams.MaxDate.GetValueOrDefault().AddHours(24));
            }
            if (reportParams.ReservationStatus != null)
            {
                reservations = reservations.Where(r => r.ReservationStatus == reportParams.ReservationStatus);
            }
            return reservations;
        }

        private List<(string, int)> CreateStatistics(ReportType type, List<Reservation> reservations)
        {
            var dictionary = new Dictionary<string, int>();

            switch (type)
            {
                case ReportType.UserId:
                    foreach (var reservation in reservations)
                    {
                        var userId = reservation.UserId.ToString();
                        if (dictionary.ContainsKey(userId))
                        {
                            dictionary[userId]++;
                        }
                        else
                        {
                            dictionary.Add(userId, 1);
                        }
                    }
                    break;
                case ReportType.PingPongTableId:
                    foreach (var reservation in reservations)
                    {
                        var pingPongTableId = reservation.PingPongTableId.ToString();
                        if (pingPongTableId != null)
                        {
                            if (dictionary.ContainsKey(pingPongTableId))
                            {
                                dictionary[pingPongTableId]++;
                            }
                            else
                            {
                                dictionary.Add(pingPongTableId, 1);
                            }
                        }
                    }
                    break;
                case ReportType.ReservationStatus:
                    foreach (var reservation in reservations)
                    {
                        var reservationStatus = reservation.ReservationStatus.ToString();
                        if (dictionary.ContainsKey(reservationStatus))
                        {
                            dictionary[reservationStatus]++;
                        }
                        else
                        {
                            dictionary.Add(reservationStatus, 1);
                        }
                    }
                    break;
                case ReportType.Hours:
                    for (int hour = 0; hour < 24; hour++)
                    {
                        dictionary.Add(hour.ToString(), 0);
                    }
                    foreach (var reservation in reservations)
                    {
                        for (int hour = 0; hour < 24; hour++)
                        {
                            if (hour >= reservation.Start.Hour && hour <= reservation.End.Hour)
                            {
                                if (hour < reservation.End.Hour || reservation.End.Minute > 0)
                                {
                                    dictionary[hour.ToString()]++;
                                }
                            }
                        }
                    }
                    break;
                case ReportType.WeekDays:
                    for (int i = 1; i <= 7; i++)
                    {
                        dictionary.Add(((DayOfWeek)(i % 7)).ToString(), 0);
                    }
                    foreach (var reservation in reservations)
                    {
                        dictionary[reservation.Start.DayOfWeek.ToString()]++;
                    }
                    break;
            }

            var report = new List<(string, int)>();

            foreach (var key in dictionary.Keys)
            {
                report.Add((key, dictionary[key]));
            }

            return report;
        }
    }
}