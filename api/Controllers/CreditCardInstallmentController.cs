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
    public class CreditCardInstallmentController : ControllerBase
    {
        private readonly ICreditCardInstallmentService _CreditCardInstallmentService;
        private readonly ICreditCardService _CreditCardService;

        public CreditCardInstallmentController(
            ICreditCardInstallmentService _creditCardInstallmentService,
            ICreditCardService _creditCardService)
        {
            _CreditCardInstallmentService = _creditCardInstallmentService;

            _CreditCardService = _creditCardService;
        }

        [HttpGet]
        public Response GetAll()
        {
            var _result = new Response();

            try
            {
                var _userId = HttpTool.Instance.GetUserId();

                _result.Data = _CreditCardInstallmentService.
                    GetAll(_userId).
                    OrderByDescending(x => x.Period);

                _result.Success = true;
            }
            catch (Exception _ex)
            {
                LogTool.Instance.Error(_ex);
            }

            return _result;
        }

        [HttpPost]
        public Response Add(CreditCardInstallmentDto _dto)
        {
            var _result = new Response();

            try
            {
                _dto.Id = _CreditCardInstallmentService.Add(_dto);

                _result.Data = _CreditCardInstallmentService.Get(x=>x.Id == _dto.Id);

                _result.Success = true;
            }
            catch (Exception _ex)
            {
                LogTool.Instance.Error(_ex);
            }

            return _result;
        }

        [HttpPut]
        public Response Update(CreditCardInstallmentDto _dto)
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

                if (!_CreditCardInstallmentService.Any(x => x.Id == _dto.Id))
                {
                    _result.Message = "the credit card installment is not found.";

                    return _result;
                }

                _CreditCardInstallmentService.Update(_dto);

                _result.Data = _CreditCardInstallmentService.Get(x=>x.Id == _dto.Id);;

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
                var _installment = _CreditCardInstallmentService.Get(x => x.Id == _id);

                if (_installment == null)
                {
                    _result.Message = "the credit card installment is not found.";

                    return _result;
                }

                var _userId = HttpTool.Instance.GetUserId();

                if (!_CreditCardService.
                    Any(x => x.UserId == _userId && x.Id == _installment.CreditCardId))
                {
                    _result.Message = "the credit card is not yours.";

                    return _result;
                }

                _CreditCardInstallmentService.Remove(_id);

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