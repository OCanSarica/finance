using System;
using System.Collections.Generic;

namespace console.models
{
    public partial class Loan
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public double Amount { get; set; }
        public int Installment { get; set; }
        public long UserId { get; set; }
        public bool Closed { get; set; }
        public DateTime Period { get; set; }
        public double PrincipalAmount { get; set; }
        public DateTime? ClosedPeriod { get; set; }

        public virtual User User { get; set; }
    }
}
