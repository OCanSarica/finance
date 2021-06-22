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
using Microsoft.EntityFrameworkCore;

namespace bll.Services
{
    public class CreditCardInstallmentService : ServiceBase, ICreditCardInstallmentService
    {
        private readonly IRepository<CreditCardInstallment> _Repository;

        public CreditCardInstallmentService(IUnitOfWork _unitofWork) : base(_unitofWork)
        {
            _Repository = _unitofWork.GetRepository<CreditCardInstallment>();
        }


        public long Add(CreditCardInstallmentDto _dto)
        {
            var _result = _Repository.Add(_dto.ConvertToEntity());

            Save();

            return _result.Id;
        }

        public void Update(CreditCardInstallmentDto _dto)
        {
            _Repository.Update(_dto.ConvertToEntity());

            Save();
        }

        public void Remove(long _id)
        {
            _Repository.Remove(_id);

            Save();
        }

        public IEnumerable<CreditCardInstallmentDto> GetAll(long _userId) =>
             _Repository.
                GetAll().
                AsQueryable().
                Include(x=>x.CreditCard).
                Where(x=>x.CreditCard.UserId == _userId).
                Select(x => x.ConvertToDto(DateTime.Now));

        public CreditCardInstallmentDto Get(
            Expression<Func<CreditCardInstallment, bool>> _predicate)
        {
            var _entity = _Repository.Get(_predicate);

            return _entity != null ? _entity.ConvertToDto(DateTime.Now) : null;
        }

        public bool Any(Expression<Func<CreditCardInstallment, bool>> _predicate) => 
            _Repository.Any(_predicate);

    }
}
