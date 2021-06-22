import Constant from '../Constants/AccountConstant';

export default function AccountReducer(
    _state = {},
    _action) {

    switch (_action.type) {

        case Constant.GetAll:
            return {
                ..._state,
                Accounts: _action.Items
            };

        case Constant.Add:
            return {
                Accounts: [_action.Item, ..._state.Accounts]
            };

        case Constant.Update:
            return {
                Accounts: _state.Accounts.
                    map(x => x.Id !== _action.Item.Id ? x : { ...x, ..._action.Item })
            };

        case Constant.Remove:
            return {
                Accounts: _state.Accounts.
                    filter(x => x.Id !== _action.Id)
            };

        case Constant.GetStatements:
            return {
                Statements: _action.Items
            };

        case Constant.GetStatementDetails:
            return {
                ..._state, // bura olmazsa home page patlıyor
                StatementDetails: {
                    ..._state.StatementDetails,
                    [_action.DetailPeriod]: _action.Items
                }
            };

        default:
            return _state;
    }
}

