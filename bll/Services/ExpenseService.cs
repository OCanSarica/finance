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
    public class ExpenseService : ServiceBase, IExpenseService
    {
        private readonly IRepository<Expense> _Repository;

        public ExpenseService(IUnitOfWork _unitofWork) : base(_unitofWork)
        {
            _Repository = _unitofWork.GetRepository<Expense>();
        }


        public long Add(ExpenseDto _dto)
        {
            var _result = _Repository.Add(_dto.ConvertToEntity());

            Save();

            return _result.Id;
        }

        public void Update(ExpenseDto _dto)
        {
            _Repository.Update(_dto.ConvertToEntity());

            Save();
        }

        public void Remove(long _id)
        {
            _Repository.Remove(_id);

            Save();
        }

        public IEnumerable<ExpenseDto> GetAll(Expression<Func<Expense,bool>> _predicate) =>
             _Repository.
                GetAll(_predicate).
                Select(x => x.ConvertToDto());

        public ExpenseDto Get(Expression<Func<Expense, bool>> _predicate)
        {
            var _entity = _Repository.Get(_predicate);

            return _entity != null ? _entity.ConvertToDto() : null;
        }

        public bool Any(Expression<Func<Expense, bool>> _predicate) => 
            _Repository.Any(_predicate);
    }
}
