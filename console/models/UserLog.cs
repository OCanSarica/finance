using System;
using System.Collections.Generic;

namespace console.models
{
    public partial class UserLog
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public int TypeDefid { get; set; }
        public DateTime Date { get; set; }
        public string Ip { get; set; }
    }
}
