import Constant from '../Constants/AuthenticationConstant';
import { History } from '../Tools';
import { UserService } from '../Services';
import { toast } from 'react-toastify';

const Login = (_username, _password) => {

    return _dispatch => {

        _dispatch(Request());

        UserService.
            Login(_username, _password).
            then(
                _response => {

                    if (!_response.Success) {

                        toast.error(_response.Message);

                        _dispatch(Fail());

                        return;
                    }

                    localStorage.setItem("user_", JSON.stringify(_response.Data));

                    localStorage.setItem('token_', _response.Data.Token);

                    _dispatch(Success(_response.Data));

                    History.push("/");
                },
            ).
            catch(_ex => {

                console.error(_ex);

                toast.error("could not login!");

                _dispatch(Fail());
            });
    };

    function Success(_user) { return { type: Constant.LoginSuccess, User: _user }; }
    function Fail(_user) { return { type: Constant.LoginFail }; }
    function Request(_user) { return { type: Constant.LoginRequest }; }
}

const Logout = (_username, _password) => {

    localStorage.clear("user_");

    return { type: Constant.Logout };
}

export default {
    Login,
    Logout
}