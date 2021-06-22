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
    public class ExpenseController : ControllerBase
    {
        private readonly IExpenseService _ExpenseService;

        public ExpenseController(IExpenseService _expenseService)
        {
            _ExpenseService = _expenseService;
        }

        [HttpPost]
        public Response Add(ExpenseDto _dto)
        {
            var _result = new Response();

            try
            {
                _result.Data = _ExpenseService.Add(_dto);

                _result.Success = true;
            }
            catch (Exception _ex)
            {
                LogTool.Instance.Error(_ex);
            }

            return _result;
        }

        [HttpPut]
        public Response Update(ExpenseDto _dto)
        {
            var _result = new Response();

            try
            {
                var _userId = HttpTool.Instance.GetUserId();

                if (!_ExpenseService.Any(x => x.UserId == _userId && x.Id == _dto.Id))
                {
                    _result.Message = "the expense is not yours.";

                    return _result;
                }

                _ExpenseService.Update(_dto);

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

                if (!_ExpenseService.Any(x => x.UserId == _userId && x.Id == _id))
                {
                    _result.Message = "the expense is not yours.";

                    return _result;
                }

                _ExpenseService.Remove(_id);

                _result.Success = true;
            }
            catch (Exception _ex)
            {
                LogTool.Instance.Error(_ex);
            }

            return _result;
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

                    _result.Data = _ExpenseService.
                        GetAll(x =>
                            x.UserId == _userId &&
                            x.Period < _maxDate &&
                            x.Period > _minDate).
                        OrderByDescending(x => x.Period);
                }
                else
                {
                    _result.Data = _ExpenseService.
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
    }
}