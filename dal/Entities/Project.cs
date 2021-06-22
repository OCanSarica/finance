using System;
using System.Collections.Generic;
using core.Bases;

namespace dal.Entities
{
    public partial class Project : EntityBase
    {
        public Project()
        {
            ProjectItem = new HashSet<ProjectItem>();
        }

        public string Name { get; set; }

        public DateTime Date { get; set; }

        public long UserId { get; set; }

        public virtual User User { get; set; }
        
        public virtual ICollection<ProjectItem> ProjectItem { get; set; }
    }
}
