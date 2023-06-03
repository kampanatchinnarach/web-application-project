using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppProject.Models
{
    public class HostList
    {
        [Key]
        public int Id { get; set; }

        public string Restaurant { get; set; }
        public int NowNum { get; set; }
        public int MaxNum { get; set; }
        public string Destination { get; set; }
        public string Status { get; set; }
        public string Order { get; set; }
    }
}
