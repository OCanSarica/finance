using dal.Bases;
using dal.Entities;
using dto.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace bll.Bases
{
    public interface IUserService
    {
        ResponseValidateUserDto ValidateUser(string _username, string _password);
        
        ResponseValidateUserDto ValidateUserWithEmail(string _email, string _password);

        ResponseValidateUserDto ValidateUserWithId(long _id, string _password);

        long Add(UserDto _dto);

        UserDto Get(long _id);

        bool Any(Expression<Func<User,bool>> _predicate);

        void ChangePassword(long _userId, string _password);
    }
}
