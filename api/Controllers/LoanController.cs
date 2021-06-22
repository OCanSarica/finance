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
    public class LoanController : ControllerBase
    {
        private readonly ILoanService _LoanService;

        public LoanController(ILoanService _loanService)
        {
            _LoanService = _loanService;
        }

        [HttpPost]
        public Response Add(LoanDto _dto)
        {
            var _result = new Response();

            try
            {
                var _id = _LoanService.Add(_dto);

                _result.Data = _LoanService.Get(x => x.Id == _id);

                _result.Success = true;
            }
            catch (Exception _ex)
            {
                LogTool.Instance.Error(_ex);
            }

            return _result;
        }

        [HttpPut]
        public Response Update(LoanDto _dto)
        {
            var _result = new Response();

            try
            {
                var _userId = HttpTool.Instance.GetUserId();

                if (!_LoanService.Any(x => x.UserId == _userId && x.Id == _dto.Id))
                {
                    _result.Message = "the loan is not yours.";

                    return _result;
                }

                _LoanService.Update(_dto);

                _result.Data = _LoanService.Get(x => x.Id == _dto.Id);

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

                if (!_LoanService.Any(x => x.UserId == _userId && x.Id == _id))
                {
                    _result.Message = "the loan is not yours.";

                    return _result;
                }

                _LoanService.Remove(_id);

                _result.Success = true;
            }
            catch (Exception _ex)
            {
                LogTool.Instance.Error(_ex);
            }

            return _result;
        }


        [HttpGet]
        public Response GetAll()
        {
            var _result = new Response();

            try
            {
                var _userId = HttpTool.Instance.GetUserId();

                _result.Data = _LoanService.
                    GetAll(x =>
                        x.UserId == _userId,
                        DateTime.Now).
                    OrderByDescending(x => x.Period);

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