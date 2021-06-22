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
    public class IncomeController : ControllerBase
    {
        private readonly IIncomeService _IncomeService;

        public IncomeController(IIncomeService _incomeService)
        {
            _IncomeService = _incomeService;
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

                    _result.Data = _IncomeService.
                        GetAll(x =>
                            x.UserId == _userId &&
                            x.Period < _maxDate &&
                            x.Period > _minDate).
                        OrderByDescending(x => x.Period);
                }
                else
                {
                    _result.Data = _IncomeService.
                        GetAll(x => x.UserId == _userId).
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
        public Response Add(IncomeDto _dto)
        {
            var _result = new Response();

            try
            {
                _result.Data = _IncomeService.Add(_dto);

                _result.Success = true;
            }
            catch (Exception _ex)
            {
                LogTool.Instance.Error(_ex);
            }

            return _result;
        }

        [HttpPut]
        public Response Update(IncomeDto _dto)
        {
            var _result = new Response();

            try
            {
                var _userId = HttpTool.Instance.GetUserId();

                if (!_IncomeService.Any(x => x.UserId == _userId && x.Id == _dto.Id))
                {
                    _result.Message = "the income is not yours.";

                    return _result;
                }

                _IncomeService.Update(_dto);

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
                var _userId = HttpTool.Instance.GetUserId();

                if (!_IncomeService.Any(x => x.UserId == _userId && x.Id == _id))
                {
                    _result.Message = "the income is not yours.";

                    return _result;
                }

                _IncomeService.Remove(_id);

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