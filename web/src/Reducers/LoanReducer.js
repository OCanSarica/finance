import Constant from '../Constants/LoanConstant';

export default function LoanReducer(
    _state = {},
    _action) {

    switch (_action.type) {

        case Constant.GetAll:

            return {

                Loans: _action.Items
            };

        case Constant.Add:

            return {

                Loans: [_action.Item, ..._state.Loans]
            };

        case Constant.Update:

            return {

                Loans: _state.Loans.
                    map(x => x.Id !== _action.Item.Id ? x : { ...x, ..._action.Item })
            };

        case Constant.Remove:

            return {

                Loans: _state.Loans.
                    filter(x => x.Id !== _action.Id)
            };

        default:
            return _state;
    }
}

