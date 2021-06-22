using System;
using System.Collections.Generic;
using System.Text;

namespace dto.Models
{
    public class CreditCardPeriodDto
    {
        public long Id { get; set; }
        public long CreditCardId { get; set; }
        public string CreditCardName { get; set; }
        public DateTime Period { get; set; }
        public double Amount { get; set; }
        public double InstallmentAmount { get; set; }
    }
}
