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
    public class CreditCardPeriodService : ServiceBase, ICreditCardPeriodService
    {
        private readonly IRepository<CreditCardPeriod> _CardRepository;
        private readonly IRepository<CreditCardInstallment> _InstallmentRepository;

        public CreditCardPeriodService(IUnitOfWork _unitofWork) : base(_unitofWork)
        {
            _CardRepository = _unitofWork.GetRepository<CreditCardPeriod>();

            _InstallmentRepository = _unitofWork.GetRepository<CreditCardInstallment>();
        }

        public long Add(CreditCardPeriodDto _dto)
        {
            var _result = _CardRepository.Add(_dto.ConvertToEntity());

            Save();

            return _result.Id;
        }

        public void Update(CreditCardPeriodDto _dto)
        {
            _CardRepository.Update(_dto.ConvertToEntity());

            Save();
        }

        public void Remove(long _id)
        {
            _CardRepository.Remove(_id);

            Save();
        }

        public IEnumerable<CreditCardPeriodDto> GetAll(
            Expression<Func<CreditCardPeriod,bool>> _predicate,
            bool _includeInstallmentAmount = false) =>
             _CardRepository.GetAll().
                AsQueryable().
                Include(x => x.CreditCard.CreditCardInstallment).
                Where(_predicate).
                Select(x => x.ConvertToDto(_includeInstallmentAmount));

        public CreditCardPeriodDto Get(
            Expression<Func<CreditCardPeriod, bool>> _predicate,
            bool _includeInstallmentAmount = false)
        {
            var _result = !_includeInstallmentAmount ?
                _CardRepository.
                    Get(_predicate) :
                _CardRepository.
                    GetAll(_predicate).
                    AsQueryable().
                    Include(x => x.CreditCard.CreditCardInstallment).
                    FirstOrDefault();

            return _result.ConvertToDto(_includeInstallmentAmount);
        }

        public bool Any(Expression<Func<CreditCardPeriod, bool>> _predicate) =>
            _CardRepository.Any(_predicate);
    }
}
