using System;
using System.Collections.Generic;
using System.Text;

namespace dto.Models
{
    public class UserDto
    {
        public long Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}

