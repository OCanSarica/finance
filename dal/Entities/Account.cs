using System;
using System.Collections.Generic;
using core.Bases;

namespace dal.Entities
{
    public partial class Account : EntityBase
    {
        public string Name { get; set; }
        public double Amount { get; set; }
        public long UserId { get; set; }
        public DateTime Date { get; set; }
        public long TypeDefid { get; set; }
        
        public virtual DefAccountType DefAccountType { get; set; }
        public virtual User User { get; set; }
    }
}
