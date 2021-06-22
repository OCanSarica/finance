using System;
using System.Collections.Generic;
using System.Text;

namespace dto.Models
{
    public class ProjectItemDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public bool IsIncome { get; set; }
        public double Amount { get; set; }
        public long ProjectId { get; set; }
        public DateTime Period { get; set; }
    }
}

