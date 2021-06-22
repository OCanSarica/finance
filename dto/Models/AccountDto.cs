using System;
using System.Collections.Generic;
using System.Text;

namespace dto.Models
{
    public class AccountDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public double Amount { get; set; }
        public DateTime Date { get; set; }
        public long TypeDefid { get; set; }
    }
}

