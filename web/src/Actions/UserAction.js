import Constant from '../Constants/UserConstant';
import UIAction from '../Actions/UIAction';
import { UserService } from '../Services';
import { toast } from 'react-toastify';

const Add = (_user) => {

    return _dispatch => {

        UserService.Add(_user).
            then(_response => {

                if (!_response.Success) {

                    toast.error(_response.Message);

                    return;
                }

                _dispatch(UIAction.SetVisibilityAddUserModal(false));

                toast.success("the user is added.");
            }).
            catch(_ex => {

                console.error(_ex);

                toast.error("could not add the user.");
            });
    };
}

const ChangePassword = (_dto) => {

    return _dispatch => {

        UserService.ChangePassword(_dto).
            then(_response => {

                if (!_response.Success) {

                    toast.error(_response.Message);

                    return;
                }

                _dispatch(UIAction.SetVisibilityAddUserModal(false));

                toast.success("password is changed.");
            }).
            catch(_ex => {

                console.error(_ex);

                toast.error("could not change password.");
            });
    };
}

export default {
    Add,
    ChangePassword
}
