using System;
using System.Collections.Generic;
using core.Bases;

namespace dal.Entities
{
    public partial class DefAccountType : EntityBase
    {
        public DefAccountType() =>  Accounts = new HashSet<Account>();

        public string Text { get; set; }

        public virtual ICollection<Account> Accounts { get; set; }
    }
}
