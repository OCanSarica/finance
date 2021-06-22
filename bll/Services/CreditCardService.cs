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
    public class CreditCardService : ServiceBase, ICreditCardService
    {
        private readonly IRepository<CreditCard> _Repository;

        public CreditCardService(IUnitOfWork _unitofWork) : base(_unitofWork)
        {
            _Repository = _unitofWork.GetRepository<CreditCard>();
        }


        public long Add(CreditCardDto _dto)
        {
            var _result = _Repository.Add(_dto.ConvertToEntity());

            Save();

            return _result.Id;
        }

        public void Update(CreditCardDto _dto)
        {
            _Repository.Update(_dto.ConvertToEntity());

            Save();
        }

        public void Remove(long _id)
        {
            _Repository.Remove(_id);

            Save();
        }

        public IEnumerable<CreditCardDto> GetAll(long _userId) =>
             _Repository.
                GetAll(x=>x.UserId == _userId).
                Select(x => x.ConvertToDto());

        public CreditCardDto Get(Expression<Func<CreditCard, bool>> _predicate)
        {
            var _entity = _Repository.Get(_predicate);

            return _entity != null ? _entity.ConvertToDto() : null;
        }

        public bool Any(Expression<Func<CreditCard, bool>> _predicate) => 
            _Repository.Any(_predicate);

    }
}
