import Constant from '../Constants/ExpenseConstant';

export default function ExpenseReducer(
    _state = {},
    _action) {

    switch (_action.type) {

        case Constant.GetAll:

            return {
                Expenses: _action.Items
            };

        case Constant.Add:

            return {
                Expenses: [_action.Item, ..._state.Expenses ]
            };

        case Constant.Update:

            return {
                Expenses: _state.Expenses.
                    map(x => x.Id !== _action.Item.Id ? x : { ...x, ..._action.Item })
            };

        case Constant.Remove:

            return {
                Expenses: _state.Expenses.filter(x => x.Id !== _action.Id)
            };

        default:
            return _state;
    }
}

