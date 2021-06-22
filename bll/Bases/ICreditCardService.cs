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
    public interface ICreditCardService
    {
        long Add(CreditCardDto _dto);

        void Update(CreditCardDto _dto);

        IEnumerable<CreditCardDto> GetAll(long _userId);

        bool Any(Expression<Func<CreditCard, bool>> _predicate);

        CreditCardDto Get(Expression<Func<CreditCard, bool>> _predicate);

        void Remove(long _id);
    }
}
