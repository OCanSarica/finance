using System;
using System.Collections.Generic;
using core.Bases;

namespace dal.Entities
{
    public partial class Loan : EntityBase
    {
        public string Name { get; set; }
        public double Amount { get; set; }
        public double PrincipalAmount { get; set; }
        public int Installment { get; set; }
        public long UserId { get; set; }
        public bool Closed { get; set; }
        public DateTime? ClosedPeriod { get; set; }
        public DateTime Period {get; set;}
        public virtual User User { get; set; }
    }
}
