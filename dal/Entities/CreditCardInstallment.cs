using System;
using System.Collections.Generic;
using core.Bases;

namespace dal.Entities
{
    public partial class CreditCardInstallment : EntityBase
    {
        public long CreditCardId { get; set; }
        public string Name { get; set; }
        public DateTime Period { get; set; }
        public double Amount { get; set; }
        public int Installment { get; set; }

        public virtual CreditCard CreditCard { get; set; }
    }
}
