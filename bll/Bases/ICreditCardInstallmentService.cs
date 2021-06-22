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
    public interface ICreditCardInstallmentService
    {
        long Add(CreditCardInstallmentDto _dto);

        void Update(CreditCardInstallmentDto _dto);

        IEnumerable<CreditCardInstallmentDto> GetAll(long _userId);

        bool Any(Expression<Func<CreditCardInstallment, bool>> _predicate);

        CreditCardInstallmentDto Get(Expression<Func<CreditCardInstallment, bool>> _predicate);

        void Remove(long _id);
    }
}
