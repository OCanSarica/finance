import Constant from '../Constants/ProjectItemConstant';

export default function ProjectItemReducer(
    _state = {},
    _action) {

    switch (_action.type) {

        case Constant.GetAll:
            return {
                ..._state,
                ProjectItems: _action.Items
            };

        case Constant.Add:
            return {
                ProjectItems: [_action.Item, ..._state.ProjectItems]
            };

        case Constant.Update:
            return {
                ProjectItems: _state.ProjectItems.
                    map(x => x.Id !== _action.Item.Id ? x : { ...x, ..._action.Item })
            };

        case Constant.Remove:
            return {
                ProjectItems: _state.ProjectItems.
                    filter(x => x.Id !== _action.Id)
            };

        default:
            return _state;
    }
}

