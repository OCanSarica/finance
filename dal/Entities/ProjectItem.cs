using System;
using System.Collections.Generic;
using core.Bases;

namespace dal.Entities
{
    public partial class ProjectItem : EntityBase
    {
        public string Name { get; set; }
        public bool IsIncome { get; set; }
        public double Amount { get; set; }
        public long ProjectId { get; set; }
        public DateTime Period { get; set; }

        public virtual Project Project { get; set; }
    }
}
