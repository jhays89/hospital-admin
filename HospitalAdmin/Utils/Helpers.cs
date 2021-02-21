using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HospitalAdmin.Utils
{
    public class Helpers
    {
        public static string GetConnectionString()
        {
            var rootDirectory = System.IO.Directory.GetParent(System.IO.Directory.GetCurrentDirectory());
            return $"Server=(localdb)\\v11.0;Integrated Security=true;AttachDbFileName={rootDirectory}\\Database\\HospitalAdmin.mdf";
        }
    }
}
