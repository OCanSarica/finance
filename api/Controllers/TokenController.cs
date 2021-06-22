using System;
using Microsoft.AspNetCore.Mvc;
using core.Filters;
using core.Tools;
using core.Models;
using bll.Bases;
using Microsoft.Extensions.Configuration;
using core.Extensions;
using bll.Extensions;
using dto.Models;
using dto.Enums;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TokenController : ControllerBase
    {
        private readonly IUserService _UserService;

        private readonly ILogService _LogService;

        private readonly IConfiguration _Configuration;

        public TokenController(
            IUserService _userService,
            ILogService _logService,
            IConfiguration _configuration)
        {
            _UserService = _userService;

            _LogService = _logService;

            _Configuration = _configuration;
        }

        [HttpPost]
        public Response GetToken(RequestGetTokenDto _dto)
        {
            var _result = new Response();

            try
            {
                var _validateResponse = _UserService.ValidateUser(
                    _dto.Username,
                    _dto.Password);

                if (!_validateResponse.Validated)
                {
                    if (_validateResponse.User != null)
                    {
                        _LogService.LogUserAsync(new RequestLogUserDto
                        {
                            UserId = _validateResponse.User.Id,
                            UserLogType = UserLogType.WrongLogin
                        });
                    }

                    _validateResponse = _UserService.ValidateUserWithEmail(
                        _dto.Username,
                        _dto.Password);

                    if (!_validateResponse.Validated)
                    {
                        if (_validateResponse.User != null)
                        {
                            _LogService.LogUserAsync(new RequestLogUserDto
                            {
                                UserId = _validateResponse.User.Id,
                                UserLogType = UserLogType.WrongLogin
                            });
                        }

                        _result.Message = "could not found user.";

                        return _result;
                    }
                }

                var _user = _validateResponse.User;

                var _token = TokenTool.Instance.GenerateToken(
                    new TokenUser
                    {
                        UserId = _user.Id
                    });

                if (string.IsNullOrEmpty(_token))
                {
                    _result.Message = "could not create token.";

                    return _result;
                }

                _LogService.LogUserAsync(new RequestLogUserDto
                {
                    UserLogType = UserLogType.Login,
                    UserId = _user.Id
                });

                _result.Data = new ResponseGetTokenDto
                {
                    Email = _user.Email,
                    Id = _user.Id,
                    Token = _token,
                    Username = _user.Username
                };

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