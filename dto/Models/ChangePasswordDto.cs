using System;
using System.Collections.Generic;
using System.Text;

namespace dto.Models
{
    public class ChangePasswordDto
    {
        public string Password { get; set; }
        public string CurrentPassword { get; set; }
    }
}

