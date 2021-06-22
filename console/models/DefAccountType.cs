using System;
using System.Collections.Generic;

namespace console.models
{
    public partial class DefAccountType
    {
        public DefAccountType()
        {
            Account = new HashSet<Account>();
        }

        public long Id { get; set; }
        public string Text { get; set; }

        public virtual ICollection<Account> Account { get; set; }
    }
}
