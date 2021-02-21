using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HospitalAdmin.Data;
using HospitalAdmin.Models;
using HospitalAdmin.Utils;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HospitalAdmin.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HospitalsController : ControllerBase
    {
        private readonly HospitalContext _context;

        public HospitalsController(HospitalContext context)
        {
            _context = context;
        }
        // GET: api/<HospitalController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            var hospital = new Hospital()
            {
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Name = "Greys",
                PatientCount = 100,
                OccupiedRoomsCount = 2
            };

            _context.Hospitals.Add(hospital);
            _context.SaveChanges();

            return new string[] { "value1", "value2" };
        }

        // GET api/<HospitalController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<HospitalController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<HospitalController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<HospitalController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
