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
    public class LoanService : ServiceBase, ILoanService
    {
        private readonly IRepository<Loan> _Repository;

        public LoanService(IUnitOfWork _unitofWork) : base(_unitofWork)
        {
            _Repository = _unitofWork.GetRepository<Loan>();
        }


        public long Add(LoanDto _dto)
        {
            var _result = _Repository.Add(_dto.ConvertToEntity());

            Save();

            return _result.Id;
        }

        public void Update(LoanDto _dto)
        {
            _Repository.Update(_dto.ConvertToEntity());

            Save();
        }

        public void Remove(long _id)
        {
            _Repository.Remove(_id);

            Save();
        }
    
        public IEnumerable<LoanDto> GetAll(
            Expression<Func<Loan,bool>> _predicate,
            DateTime _referenceDate) =>
             _Repository.GetAll(_predicate).
                Select(x => x.ConvertToDto(_referenceDate));

        public LoanDto Get(Expression<Func<Loan, bool>> _predicate)
        {
            var _entity = _Repository.Get(_predicate);

            return _entity != null ? _entity.ConvertToDto(DateTime.Now) : null;
        }

        public bool Any(Expression<Func<Loan, bool>> _predicate) => 
            _Repository.Any(_predicate);
    }
}
