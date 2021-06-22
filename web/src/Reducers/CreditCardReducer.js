import Constant from '../Constants/CreditCardConstant';

export default function CreditCardReducer(
    _state = {},
    _action) {

    switch (_action.type) {

        case Constant.GetAll:

            return {

                CreditCards: _action.Items
            };

        case Constant.Add:

            return {

                CreditCards: [_action.Item, ..._state.CreditCards]
            };

        case Constant.Update:

            return {

                CreditCards: _state.CreditCards.
                    map(x => x.Id !== _action.Item.Id ? x : { ...x, ..._action.Item })
            };

        case Constant.Remove:

            return {

                CreditCards: _state.CreditCards.
                    filter(x => x.Id !== _action.Id)
            };

        default:
            return _state;
    }
}

