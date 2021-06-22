using System;
using Microsoft.AspNetCore.Mvc;
using core.Tools;
using core.Models;
using bll.Bases;
using bll.Extensions;
using dto.Models;
using core.Filters;
using System.Linq;

namespace api.Controllers
{
    [ApiController]
    [AuthApiFilter]
    [Route("api/[controller]")]
    public class CreditCardPeriodController : ControllerBase
    {
        private readonly ICreditCardPeriodService _CreditCardPeriodService;
        private readonly ICreditCardService _CreditCardService;

        public CreditCardPeriodController(
            ICreditCardPeriodService _creditCardPeriodService,
            ICreditCardService _creditCardService)
        {
            _CreditCardPeriodService = _creditCardPeriodService;

            _CreditCardService = _creditCardService;
        }

        [HttpGet]
        [Route("{_year}/{_month}")]
        public Response GetAll(int _year, int _month)
        {
            var _result = new Response();

            try
            {
                var _userId = HttpTool.Instance.GetUserId();

                if (_year != 0 && _month != 0)
                {
                    var _period = new DateTime(_year, _month, 1);

                    var _minDate = _period.AddDays(-1);

                    var _maxDate = _period.AddMonths(1);

                    _result.Data = _CreditCardPeriodService.
                        GetAll(
                            x =>
                                x.CreditCard.UserId == _userId &&
                                x.Period < _maxDate &&
                                x.Period > _minDate,
                            true).
                        OrderByDescending(x => x.Period);
                }
                else
                {
                    _result.Data = _CreditCardPeriodService.
                        GetAll(
                            x => x.CreditCard.UserId == _userId,
                            true).
                        OrderByDescending(x => x.Period);
                }

                _result.Success = true;
            }
            catch (Exception _ex)
            {
                LogTool.Instance.Error(_ex);
            }

            return _result;
        }

        [HttpPost]
        public Response Add(CreditCardPeriodDto _dto)
        {
            var _result = new Response();

            try
            {
                var _date = new DateTime(
                    _dto.Period.Year, 
                    _dto.Period.Month, 
                    1);

                if (_CreditCardPeriodService.Any(x =>
                    x.Period == _date &&
                    x.CreditCardId == _dto.CreditCardId))
                {
                    _result.Message = 
                        "this period debt is already exist for selected credit card.";

                    return _result;
                }

                _dto.Id = _CreditCardPeriodService.Add(_dto);

                _result.Data = _CreditCardPeriodService.Get(x =>
                    x.Id == _dto.Id,
                    true);

                _result.Success = true;
            }
            catch (Exception _ex)
            {
                LogTool.Instance.Error(_ex);
            }

            return _result;
        }

        [HttpPut]
        public Response Update(CreditCardPeriodDto _dto)
        {
            var _result = new Response();

            try
            {
                var _userId = HttpTool.Instance.GetUserId();

                if (!_CreditCardService.
                    Any(x => x.UserId == _userId && x.Id == _dto.CreditCardId))
                {
                    _result.Message = "the credit card is not yours.";

                    return _result;
                }

                if (!_CreditCardPeriodService.Any(x => x.Id == _dto.Id))
                {
                    _result.Message = "the credit card period is not found.";

                    return _result;
                }

                var _date = new DateTime(
                    _dto.Period.Year, 
                    _dto.Period.Month, 
                    1);

                if (_CreditCardPeriodService.Any(x =>
                    x.Period == _date &&
                    x.CreditCardId == _dto.CreditCardId &&
                    x.Id != _dto.Id))
                {
                    _result.Message = 
                         "this period debt is already exist for selected credit card.";

                    return _result;
                }

                _CreditCardPeriodService.Update(_dto);

                _result.Data = _CreditCardPeriodService.Get(x =>
                    x.Id == _dto.Id,
                    true);

                _result.Success = true;
            }
            catch (Exception _ex)
            {
                LogTool.Instance.Error(_ex);
            }

            return _result;
        }

        [HttpDelete]
        [Route("{_id}")]
        public Response Remove(long _id)
        {
            var _result = new Response();

            try
            {
                var _period = _CreditCardPeriodService.Get(x => x.Id == _id);

                if (_period == null)
                {
                    _result.Message = "the credit card period is not found.";

                    return _result;
                }

                var _userId = HttpTool.Instance.GetUserId();

                if (!_CreditCardService.Any(x => 
                    x.UserId == _userId && 
                    x.Id == _period.CreditCardId))
                {
                    _result.Message = "the credit card is not yours.";

                    return _result;
                }

                _CreditCardPeriodService.Remove(_id);

                _result.Success = true;
            }
            catch (Exception _ex)
            {
                LogTool.Instance.Error(_ex);
            }

            return _result;
        }
    }
}