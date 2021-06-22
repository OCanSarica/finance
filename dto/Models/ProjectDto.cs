using System;
using System.Collections.Generic;
using System.Text;

namespace dto.Models
{
    public class ProjectDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public double Amount { get; set; }
    }
}

