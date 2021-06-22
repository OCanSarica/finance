import Constant from '../Constants/UIConstant';

export default function UIReducer(
    _state =
        {
            VisibleLoadingPanel: false,
            VisibleAddUserModal: false,
            VisibleChangePasswordModal: false,
        },
    _action) {

    switch (_action.type) {

        case Constant.SetVisibilityLoadingPanel:
            return {
                VisibleLoadingPanel: _action.Status
            };

        case Constant.SetVisibilityAddUserModal:
            return {
                VisibleAddUserModal: _action.Status
            };

        case Constant.SetVisibilityChangePasswordModal:
            return {
                VisibleChangePasswordModal: _action.Status
            };

        default:
            return _state;
    }
}

