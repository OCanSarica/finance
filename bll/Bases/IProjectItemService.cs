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
    public interface IProjectItemService
    {
        long Add(ProjectItemDto _dto);

        void Update(ProjectItemDto _dto);

        void Remove(long _id);

        IEnumerable<ProjectItemDto> GetAll(long _projectId);
    
        bool Check(long _userId, long _id);
    }
}
