using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HospitalAdmin.Models
{
    public class Hospital
    {
        public int Id { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [Range(0, int.MaxValue)]
        public int PatientCount { get; set; }

        [Range(0, int.MaxValue)]
        public int OccupiedRoomsCount { get; set; }
    }
}
