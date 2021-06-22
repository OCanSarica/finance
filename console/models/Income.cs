using System;
using System.Collections.Generic;

namespace console.models
{
    public partial class Income
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public double Amount { get; set; }
        public DateTime Period { get; set; }
        public long UserId { get; set; }

        public virtual User User { get; set; }
    }
}
