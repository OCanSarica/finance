using System;
using System.Collections.Generic;
using System.Text;

namespace dto.Models
{
    public class AccountStatementDto
    {
        public DateTime Period { get; set; }
        public double IncomeAmount { get; set; }
        public double ExpenseAmount { get; set; }
        public double LoanAmount { get; set; }
        public double CreditCardAmount { get; set; }
        public double CreditCardInstallmentAmount { get; set; }
        public double Summary { get; set; }
    }
}
