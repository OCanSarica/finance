using core.Bases;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace dal.Bases
{
    public interface IUnitOfWork
    {
        IRepository<T> GetRepository<T>() where T : EntityBase;

        void Save();
    }
}
