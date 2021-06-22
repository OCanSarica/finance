import Constant from '../Constants/AuthenticationConstant';

let _user = JSON.parse(localStorage.getItem('user_'));

const _initialState = _user ? { User: _user } : {};

export default function AuthenticationReducer(
    _state = _initialState,
    _action) {

    switch (_action.type) {

        case Constant.LoginFail:
            return { };

        case Constant.LoginRequest:
            return { LoginRequest: true };

        case Constant.LoginSuccess:
            return { User: _action.User };

        case Constant.Logout:
            return { User: null };

        default:
            return _state;
    }
}

