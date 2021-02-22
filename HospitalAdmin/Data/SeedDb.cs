using HospitalAdmin.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HospitalAdmin.Data
{
    public class SeedDb
    {
        public static List<Hospital> GetHospitals()
        {
            var hopsitals = new List<Hospital>();

            hopsitals.Add(new Hospital()
            {
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Name = "Grey's General",
                PatientCount = 56,
                TotalRoomCount = 50
            });

            hopsitals.Add(new Hospital()
            {
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Name = "Scrubs Emergency Hospital",
                PatientCount = 106,
                TotalRoomCount = 80
            });

            hopsitals.Add(new Hospital()
            {
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Name = "Clooney Hope Hospital",
                PatientCount = 200,
                TotalRoomCount = 150
            });

            return hopsitals;
        }
    }
}
