using System;
using Microsoft.AspNetCore.Mvc;
using core.Tools;
using core.Models;
using bll.Bases;
using bll.Extensions;
using dto.Models;
using core.Filters;

namespace api.Controllers
{
    [ApiController]
    [AuthApiFilter]
    [Route("api/[controller]")]
    public class CreditCardController : ControllerBase
    {
        private readonly ICreditCardService _CreditCardService;

        public CreditCardController(ICreditCardService _creditCardService)
        {
            _CreditCardService = _creditCardService;
        }

        [HttpGet]
        public Response GetAll()
        {
            var _result = new Response();

            try
            {
                var _userId = HttpTool.Instance.GetUserId();

                _result.Data = _CreditCardService.GetAll(_userId);

                _result.Success = true;
            }
            catch (Exception _ex)
            {
                LogTool.Instance.Error(_ex);
            }

            return _result;
        }

        [HttpPost]
        public Response Add(CreditCardDto _dto)
        {
            var _result = new Response();

            try
            {
                _dto.Id = _CreditCardService.Add(_dto);

                _result.Data = _dto;

                _result.Success = true;
            }
            catch (Exception _ex)
            {
                LogTool.Instance.Error(_ex);
            }

            return _result;
        }

        [HttpPut]
        public Response Update(CreditCardDto _dto)
        {
            var _result = new Response();

            try
            {
                var _userId = HttpTool.Instance.GetUserId();

                if (!_CreditCardService.Any(x => x.UserId == _userId && x.Id == _dto.Id))
                {
                    _result.Message = "the credit card is not yours.";

                    return _result;
                }

                _CreditCardService.Update(_dto);

                _result.Data = _dto;

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

                if (!_CreditCardService.Any(x => x.UserId == _userId && x.Id == _id))
                {
                    _result.Message = "the credit card is not yours.";

                    return _result;
                }

                _CreditCardService.Remove(_id);

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