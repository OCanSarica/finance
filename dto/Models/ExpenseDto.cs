using System;
using System.Collections.Generic;
using System.Text;

namespace dto.Models
{
    public class ExpenseDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public double Amount { get; set; }
        public DateTime Period {get; set;}
    }
}
