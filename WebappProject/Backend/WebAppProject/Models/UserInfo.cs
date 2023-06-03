using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppProject.Models
{
    public class UserInfo
    {
        [Key]
        public string StudentId { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string PaymentBank { get; set; }
        public string PaymentNumber { get; set; }
        public string Password { get; set; }
        public string UserPhotosName { get; set; }
        public string PaymentPhotosName { get; set; }

    }
}
