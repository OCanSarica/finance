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
    public class IncomeService : ServiceBase, IIncomeService
    {
        private readonly IRepository<Income> _Repository;

        public IncomeService(IUnitOfWork _unitofWork) : base(_unitofWork)
        {
            _Repository = _unitofWork.GetRepository<Income>();
        }


        public long Add(IncomeDto _dto)
        {
            var _result = _Repository.Add(_dto.ConvertToEntity());

            Save();

            return _result.Id;
        }

        public void Update(IncomeDto _dto)
        {
            _Repository.Update(_dto.ConvertToEntity());

            Save();
        }

        public void Remove(long _id)
        {
            _Repository.Remove(_id);

            Save();
        }

        public IEnumerable<IncomeDto> GetAll(Expression<Func<Income,bool>> _predicate) =>
             _Repository.
                GetAll(_predicate).
                Select(x => x.ConvertToDto());

        public IncomeDto Get(Expression<Func<Income, bool>> _predicate)
        {
            var _entity = _Repository.Get(_predicate);

            return _entity != null ? _entity.ConvertToDto() : null;
        }

        public bool Any(Expression<Func<Income, bool>> _predicate) =>
            _Repository.Any(_predicate);
    }
}
