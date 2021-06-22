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
    public interface IExpenseService
    {
        long Add(ExpenseDto _dto);

        void Update(ExpenseDto _dto);

        IEnumerable<ExpenseDto> GetAll(Expression<Func<Expense,bool>> _predicate);

        bool Any(Expression<Func<Expense, bool>> _predicate);

        ExpenseDto Get(Expression<Func<Expense, bool>> _predicate);

        void Remove(long _id);
    }
}
