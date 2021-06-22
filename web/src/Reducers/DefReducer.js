import Constant from '../Constants/DefConstant';

export default function DefReducer(
    _state = {},
    _action) {

    switch (_action.type) {

        case Constant.GetAccountTypes:
            return {
                ..._state,
                AccountTypes: _action.Items
            };

        default:
            return _state;
    }
}

