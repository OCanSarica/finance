using core.Bases;
using dal.Bases;
using dal.Entities;
using dto.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace bll.Bases
{
    public interface IProjectService
    {
        IEnumerable<ProjectDto> GetAll(long _userId);

        ProjectDto Get(long _id);

        long Add(ProjectDto _dto);

        void Update(ProjectDto _dto);

        void Remove(long _id);
        
        bool Check(long _userId, long _id);
    }
}
