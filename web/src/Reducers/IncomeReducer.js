import Constant from '../Constants/IncomeConstant';

export default function IncomeReducer(
    _state = {},
    _action) {

    switch (_action.type) {

        case Constant.GetAll:

            return {

                Incomes: _action.Items
            };

        case Constant.Add:

            return {

                Incomes: [_action.Item, ..._state.Incomes]
            };

        case Constant.Update:

            return {

                Incomes: _state.Incomes.
                    map(x => x.Id !== _action.Item.Id ? x : { ...x, ..._action.Item })
            };

        case Constant.Remove:

            return {

                Incomes: _state.Incomes.
                    filter(x => x.Id !== _action.Id)
            };

        default:
            return _state;
    }
}

