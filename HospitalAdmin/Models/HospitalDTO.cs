using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HospitalAdmin.Models
{
    public class HospitalDTO
    {
        public int? Id { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [Range(0, int.MaxValue)]
        public int PatientCount { get; set; }

        [Range(0, int.MaxValue)]
        public int TotalRoomCount { get; set; }

        public Hospital CreateHospitalFromDTO(HospitalDTO hospitalDTO)
        {
            return new Hospital()
            {
                CreatedAt = hospitalDTO.CreatedAt,
                UpdatedAt = hospitalDTO.UpdatedAt,
                Name = hospitalDTO.Name,
                PatientCount = hospitalDTO.PatientCount,
                TotalRoomCount = hospitalDTO.TotalRoomCount
            };
        }

        public void MapDTOToHospital(HospitalDTO hospitalDTO, Hospital hospital)
        {
            hospital.Id = (int)hospitalDTO.Id;
            hospital.CreatedAt = hospitalDTO.CreatedAt;
            hospital.UpdatedAt = hospital.UpdatedAt;
            hospital.Name = hospitalDTO.Name;
            hospital.PatientCount = hospitalDTO.PatientCount;
            hospital.TotalRoomCount = hospitalDTO.TotalRoomCount;
        }
    }
}
