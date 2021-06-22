using System;
using System.Collections.Generic;
using core.Bases;

namespace dal.Entities
{
    public partial class CreditCardPeriod : EntityBase
    {
        public long CreditCardId { get; set; }
        public DateTime Period { get; set; }
        public double Amount { get; set; }

        public virtual CreditCard CreditCard { get; set; }
    }
}
