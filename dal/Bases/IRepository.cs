using core.Bases;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace dal.Bases
{
    public interface IRepository<T> where T : EntityBase
    {
        IEnumerable<T> GetAll();

        T Get(long _id);

        IEnumerable<T> GetAll(Expression<Func<T, bool>> _predicate);
        
        T Get(Expression<Func<T, bool>> _predicate);

        bool Any(Expression<Func<T, bool>> _predicate);

        T GetFirst(Expression<Func<T, bool>> _predicate);

        T Add(T _entity);

        Task<T> AddAsync(T _entity);

        void Update(T _entity);

        void Remove(T _entity);

        void Remove(long _id);
    }
}
