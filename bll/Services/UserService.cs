using bll.Bases;
using bll.Extensions;
using core.Models;
using core.Tools;
using dal.Bases;
using dal.Entities;
using dto.Enums;
using dto.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace bll.Services
{
    public class UserService : ServiceBase, IUserService
    {
        private readonly IRepository<User> _Repository;

        private readonly ILogService _LogService;

        public UserService(
            IUnitOfWork _unitofWork,
            ILogService _logService) : base(_unitofWork)
        {
            _Repository = _unitofWork.GetRepository<User>();

            _LogService = _logService;
        }

        public UserDto Get(long _userId) =>
            _Repository.Get(_userId).ConvertToDto();

        public bool Any(Expression<Func<User, bool>> _predicate) =>
            _Repository.Any(_predicate);

        public long Add(UserDto _dto)
        {
            var _result = _Repository.Add(_dto.ConvertToEntity());

            Save();

            return _result.Id;
        }

        public void ChangePassword(long _userId, string _password)
        {
            var _user = _Repository.Get(_userId);

            _user.Password = EncryptionTool.Instance.Encrypt(_password);

            _Repository.Update(_user);

            Save();
        }

        public ResponseValidateUserDto ValidateUser(string _username, string _password)
        {
            var _result = new ResponseValidateUserDto();

            var _user = _Repository.Get(x => x.Username == _username);

            if (_user == null)
            {
                return _result;
            }

            if (EncryptionTool.Instance.Decrypt(_user.Password) != _password)
            {
                _result.User = new UserDto
                {
                    Id = _user.Id
                };

                return _result;
            }

            _result.User = _user.ConvertToDto();

            _result.Validated = true;

            return _result;
        }

        public ResponseValidateUserDto ValidateUserWithEmail(string _email, string _password)
        {
            var _result = new ResponseValidateUserDto();

            var _user = _Repository.Get(x => x.Email == _email);

            if (_user == null)
            {
                return _result;
            }

            if (EncryptionTool.Instance.Decrypt(_user.Password) != _password)
            {
                _result.User = new UserDto
                {
                    Id = _user.Id
                };

                return _result;
            }

            _result.User = _user.ConvertToDto();

            _result.Validated = true;

            return _result;
        }

        public ResponseValidateUserDto ValidateUserWithId(long _id, string _password)
        {
            var _result = new ResponseValidateUserDto();

            var _user = _Repository.Get(x => x.Id == _id);

            if (_user == null)
            {
                return _result;
            }

            if (EncryptionTool.Instance.Decrypt(_user.Password) != _password)
            {
                _result.User = new UserDto
                {
                    Id = _user.Id
                };

                return _result;
            }

            _result.User = _user.ConvertToDto();

            _result.Validated = true;

            return _result;
        }
    }
}
