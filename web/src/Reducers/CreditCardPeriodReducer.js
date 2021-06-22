import Constant from '../Constants/CreditCardPeriodConstant';

export default function CreditCardPeriodReducer(
    _state = {},
    _action) {

    switch (_action.type) {

        case Constant.GetAll:

            return {

                CreditCardPeriods: _action.Items
            };

        case Constant.Add:

            return {

                CreditCardPeriods: [_action.Item, ..._state.CreditCardPeriods]
            };

        case Constant.Update:

            return {

                CreditCardPeriods: _state.CreditCardPeriods.
                    map(x => x.Id !== _action.Item.Id ? x : { ...x, ..._action.Item })
            };

        case Constant.Remove:

            return {

                CreditCardPeriods: _state.CreditCardPeriods.
                    filter(x => x.Id !== _action.Id)
            };

        default:
            return _state;
    }
}

