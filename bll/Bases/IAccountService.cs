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
    public interface IAccountService
    {
        long Add(AccountDto _dto);

        void Update(AccountDto _dto);

        IEnumerable<AccountDto> GetAll(long _userId);

        bool Any(Expression<Func<Account, bool>> _predicate);

        AccountDto Get(Expression<Func<Account, bool>> _predicate);

        IEnumerable<DefAccountTypeDto> GetTypes();

        void Remove(long _id);
    }
}
