using System;
using System.Collections.Generic;
using System.Text;

namespace dto.Models
{
    public class CreditCardInstallmentDto
    {
        public long Id { get; set; }
        public double Amount { get; set; }
        public long CreditCardId { get; set; }
        public int Installment { get; set; }
        public string Name { get; set; }
        public DateTime Period { get; set; }
        public double TotalAmount { get; set; }
        public int CurrentInstallment { get; set; }
        public bool IsCompleted {get; set;}
    }
}
