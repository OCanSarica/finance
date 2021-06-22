import Constant from '../Constants/UIConstant';

const SetVisibilityLoadingPanel= (_status) => {

    return { type: Constant.SetVisibilityLoadingPanel, Status: _status };
}

const SetVisibilityAddUserModal = (_status) => {

    return { type: Constant.SetVisibilityAddUserModal, Status: _status };
}

const SetVisibilityChangePasswordModal= (_status) => {

    return { type: Constant.SetVisibilityChangePasswordModal, Status: _status };
}

export default {
    SetVisibilityLoadingPanel,
    SetVisibilityAddUserModal,
    SetVisibilityChangePasswordModal
}
