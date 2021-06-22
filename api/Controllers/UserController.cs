using System;
using Microsoft.AspNetCore.Mvc;
using core.Filters;
using core.Tools;
using core.Models;
using bll.Bases;
using dto.Models;

namespace api.Controllers
{
    [AuthApiFilter]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _UserService;

        public UserController(IUserService _userService)
        {
            _UserService = _userService;
        }

        [HttpPost]
        public Response Add(UserDto _dto)
        {
            var _result = new Response();

            try
            {
                var _userId = HttpTool.Instance.GetUserId();

                var _user = _UserService.Get(_userId);

                if (_userId != 1 || _user.Username != "ozzz")
                {
                    _result.Message = ";)";

                    return _result;
                }

                if (_UserService.Any(x => x.Email == _dto.Email))
                {
                    _result.Message = "the email is in use.";

                    return _result;
                }

                if (_UserService.Any(x => x.Username == _dto.Username))
                {
                    _result.Message = "the username is in use.";

                    return _result;
                }

                _result.Data = _UserService.Add(_dto);

                _result.Success = true;
            }
            catch (Exception _ex)
            {
                LogTool.Instance.Error(_ex);
            }

            return _result;
        }

        [HttpPost]
        [Route("[action]")]
        public Response ChangePassword(ChangePasswordDto _dto)
        {
            var _result = new Response();

            try
            {
                if (_dto.Password.Trim().Length < 6)
                {
                    _result.Message = "please enter a minimum 6 characters password.";

                    return _result;
                }

                var _userId = HttpTool.Instance.GetUserId();

                var _validateResponse = _UserService.ValidateUserWithId(
                    _userId,
                    _dto.CurrentPassword);

                if (!_validateResponse.Validated)
                {
                    _result.Message = "the current password is wrong.";

                    return _result;
                }

                _UserService.ChangePassword(_userId, _dto.Password);

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