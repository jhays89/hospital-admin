using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HospitalAdmin.Data;
using HospitalAdmin.Models;
using Microsoft.AspNetCore.Mvc;

namespace HospitalAdmin.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HospitalsController : ControllerBase
    {
        private readonly HospitalContext dbContext;

        public HospitalsController(HospitalContext context)
        {
            dbContext = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var hospitals = dbContext.Hospitals.ToList();
            return Ok(hospitals);
        }

        [HttpPost]
        public IActionResult Post(HospitalDTO hospitalDTO)
        {
            try
            {
                var hospital = hospitalDTO.CreateHospitalFromDTO(hospitalDTO);
                hospital.CreatedAt = DateTime.UtcNow;
                hospital.UpdatedAt = DateTime.UtcNow;

                dbContext.Add(hospital);
                dbContext.SaveChanges();

                return Ok(hospital);
            }
            catch
            {
                return Unauthorized();
            }
        }

        [HttpPut]
        public IActionResult Put(HospitalDTO hospitalDTO)
        {
            try
            {
                var existingHospital = dbContext.Hospitals.FirstOrDefault(h => h.Id == (int)hospitalDTO.Id);

                if(existingHospital != null)
                {
                    hospitalDTO.MapDTOToHospital(hospitalDTO, existingHospital);
                    existingHospital.UpdatedAt = DateTime.UtcNow;

                    dbContext.SaveChanges();

                    return Ok(existingHospital);
                }
                else
                {
                    return NotFound();
                }
            }
            catch
            {
                return Unauthorized();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var hospital = dbContext.Hospitals.FirstOrDefault(h => h.Id == id);
            if (hospital != null)
            {
                dbContext.Remove(hospital);
                dbContext.SaveChanges();

                return Ok();
            }
            else
            {
                return NotFound();
            }
        }
    }
}
