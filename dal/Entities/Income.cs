using System;
using System.Collections.Generic;
using core.Bases;

namespace dal.Entities
{
    public partial class Income : EntityBase
    {
        public string Name { get; set; }
        
        public double Amount { get; set; }
        
        public long UserId { get; set; }

        public DateTime Period { get; set; }

        public virtual User User { get; set; }
    }
}
