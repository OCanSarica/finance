using System;
using System.Collections.Generic;

namespace console.models
{
    public partial class CreditCardPeriod
    {
        public long Id { get; set; }
        public long CreditCardId { get; set; }
        public DateTime Period { get; set; }
        public double Amount { get; set; }

        public virtual CreditCard CreditCard { get; set; }
    }
}
