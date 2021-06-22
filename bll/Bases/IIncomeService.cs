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
    public interface IIncomeService
    {
        long Add(IncomeDto _dto);

        void Update(IncomeDto _dto);

        IEnumerable<IncomeDto> GetAll(Expression<Func<Income,bool>> _predicate);

        bool Any(Expression<Func<Income, bool>> _predicate);

        IncomeDto Get(Expression<Func<Income, bool>> _predicate);

        void Remove(long _id);
    }
}
