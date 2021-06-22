using System;
using System.Collections.Generic;

namespace console.models
{
    public partial class Account
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public double Amount { get; set; }
        public long UserId { get; set; }
        public long TypeDefid { get; set; }
        public DateTime Date { get; set; }

        public virtual DefAccountType TypeDef { get; set; }
        public virtual User User { get; set; }
    }
}
