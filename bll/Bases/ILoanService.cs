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
    public interface ILoanService
    {
        long Add(LoanDto _dto);

        void Update(LoanDto _dto);

        //referenceDate is for calculating iscompleted according the date
        IEnumerable<LoanDto> GetAll(
            Expression<Func<Loan,bool>> _predicate, 
            DateTime _referenceDate);

        bool Any(Expression<Func<Loan, bool>> _predicate);

        LoanDto Get(Expression<Func<Loan, bool>> _predicate);

        void Remove(long _id);
    }
}
