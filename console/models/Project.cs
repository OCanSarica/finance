using System;
using System.Collections.Generic;

namespace console.models
{
    public partial class Project
    {
        public Project()
        {
            ProjectItem = new HashSet<ProjectItem>();
        }

        public long Id { get; set; }
        public string Name { get; set; }
        public double Amount { get; set; }
        public long UserId { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<ProjectItem> ProjectItem { get; set; }
    }
}
