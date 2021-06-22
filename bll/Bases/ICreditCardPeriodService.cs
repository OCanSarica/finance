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
    public interface ICreditCardPeriodService
    {
        long Add(CreditCardPeriodDto _dto);

        void Update(CreditCardPeriodDto _dto);

        IEnumerable<CreditCardPeriodDto> GetAll(
            Expression<Func<CreditCardPeriod, bool>> _predicate,
            bool _includeInsallmentAmount = false);

        bool Any(Expression<Func<CreditCardPeriod, bool>> _predicate);

        CreditCardPeriodDto Get(
            Expression<Func<CreditCardPeriod, bool>> _predicate,
            bool _includeInsallmentAmount = false);

        void Remove(long _id);
    }
}
