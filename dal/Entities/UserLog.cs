using System;
using System.Collections.Generic;
using core.Bases;

namespace dal.Entities
{
    public partial class UserLog : EntityBase
    {
        public long UserId { get; set; }
        public int TypeDefid { get; set; }
        public DateTime Date { get; set; }
        public string Ip { get; set; }
    }
}
