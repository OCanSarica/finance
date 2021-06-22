using System;
using System.Collections.Generic;
using core.Bases;

namespace dal.Entities
{
    public partial class CreditCard: EntityBase
    {
        public CreditCard()
        {
            CreditCardInstallment = new HashSet<CreditCardInstallment>();
            CreditCardPeriod = new HashSet<CreditCardPeriod>();
        }

        public string Name { get; set; }
        public long UserId { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<CreditCardInstallment> CreditCardInstallment { get; set; }
        public virtual ICollection<CreditCardPeriod> CreditCardPeriod { get; set; }
    }
}
