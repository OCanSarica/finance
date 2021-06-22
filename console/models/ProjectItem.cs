using System;
using System.Collections.Generic;

namespace console.models
{
    public partial class ProjectItem
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public bool IsIncome { get; set; }
        public double Amount { get; set; }
        public long ProjectId { get; set; }
        public DateTime Period { get; set; }

        public virtual Project Project { get; set; }
    }
}
