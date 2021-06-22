import Constant from '../Constants/CreditCardInstallmentConstant';

export default function CreditCardInstallmentReducer(
    _state = {},
    _action) {

    switch (_action.type) {

        case Constant.GetAll:

            return {

                CreditCardInstallments: _action.Items
            };

        case Constant.Add:

            return {

                CreditCardInstallments: [_action.Item, ..._state.CreditCardInstallments]
            };

        case Constant.Update:

            return {

                CreditCardInstallments: _state.CreditCardInstallments.
                    map(x => x.Id !== _action.Item.Id ? x : { ...x, ..._action.Item })
            };

        case Constant.Remove:

            return {

                CreditCardInstallments: _state.CreditCardInstallments.
                    filter(x => x.Id !== _action.Id)
            };

        default:
            return _state;
    }
}

