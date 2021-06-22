import Constant from '../Constants/ProjectConstant';

export default function ProjectReducer(
    _state = {},
    _action) {

    switch (_action.type) {

        case Constant.GetAll:
            return {
                ..._state,
                Projects: _action.Items
            };

        case Constant.Get:
            return {
                Project: _action.Item
            };

        case Constant.Add:
            return {
                Projects: [_action.Item, ..._state.Projects]
            };

        case Constant.Update:
            return {
                Projects: _state.Projects.
                    map(x => x.Id !== _action.Item.Id ? x : { ...x, ..._action.Item })
            };

        case Constant.Remove:
            return {
                Projects: _state.Projects.
                    filter(x => x.Id !== _action.Id)
            };

        default:
            return _state;
    }
}

