using bll.Bases;
using core.Bases;
using dal.Bases;
using bll.Extensions;
using dto.Models;
using System.Collections.Generic;
using dal.Entities;
using System.Linq;
using System.Linq.Expressions;
using System;

namespace bll.Services
{
    public class AccountService : ServiceBase, IAccountService
    {
        private readonly IRepository<Account> _Repository;
        
        private readonly IRepository<DefAccountType> _TypeRepository;

        public AccountService(IUnitOfWork _unitofWork) : base(_unitofWork)
        {
            _Repository = _unitofWork.GetRepository<Account>();

            _TypeRepository = _unitofWork.GetRepository<DefAccountType>();
        }


        public long Add(AccountDto _dto)
        {
            var _result = _Repository.Add(_dto.ConvertToEntity());

            Save();

            return _result.Id;
        }

        public void Update(AccountDto _dto)
        {
            _Repository.Update(_dto.ConvertToEntity());

            Save();
        }

        public void Remove(long _id)
        {
            _Repository.Remove(_id);

            Save();
        }

        public IEnumerable<AccountDto> GetAll(long _userId) =>
             _Repository.
                GetAll(x => x.UserId == _userId).
                Select(x => x.ConvertToDto());

        public AccountDto Get(Expression<Func<Account, bool>> _predicate)
        {
            var _entity = _Repository.Get(_predicate);

            return _entity != null ? _entity.ConvertToDto() : null;
        }

        public bool Any(Expression<Func<Account, bool>> _predicate) =>
            _Repository.Any(_predicate);

        public IEnumerable<DefAccountTypeDto> GetTypes() =>
            _TypeRepository.
                GetAll().
                OrderBy(x=>x.Text).
                Select(x=>x.ConvertToDto());

    }
}
