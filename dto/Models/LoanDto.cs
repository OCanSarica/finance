using System;
using System.Collections.Generic;
using System.Text;

namespace dto.Models
{
    public class LoanDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public double PrincipalAmount { get; set; }
        public double Amount { get; set; }
        public int Installment { get; set; }
        public bool Closed { get; set; }
        public DateTime? ClosedPeriod { get; set; }
        public DateTime Period { get; set; }
        public double TotalAmount {get; set;}
        public int CurrentInstallment {get; set;}
        public bool IsCompleted {get; set;}
    }
}
