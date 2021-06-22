using System;
using System.Collections.Generic;

namespace console.models
{
    public partial class CreditCard
    {
        public CreditCard()
        {
            CreditCardInstallment = new HashSet<CreditCardInstallment>();
            CreditCardPeriod = new HashSet<CreditCardPeriod>();
        }

        public long Id { get; set; }
        public string Name { get; set; }
        public long UserId { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<CreditCardInstallment> CreditCardInstallment { get; set; }
        public virtual ICollection<CreditCardPeriod> CreditCardPeriod { get; set; }
    }
}
