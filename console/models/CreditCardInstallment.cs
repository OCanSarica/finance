using System;
using System.Collections.Generic;

namespace console.models
{
    public partial class CreditCardInstallment
    {
        public long Id { get; set; }
        public long CreditCardId { get; set; }
        public string Name { get; set; }
        public DateTime Period { get; set; }
        public double Amount { get; set; }
        public int Installment { get; set; }

        public virtual CreditCard CreditCard { get; set; }
    }
}
