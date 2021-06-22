import Constant from '../Constants/ProjectItemConstant';
import UIAction from './UIAction';
import { ProjectItemService } from '../Services';
import { toast } from 'react-toastify';

const GetAll = (_projectId) => {

    return _dispatch => {

        _dispatch(UIAction.SetVisibilityLoadingPanel(true));

        ProjectItemService.GetAll(_projectId).
            then(
                _response => {

                    if (!_response.Success) {

                        toast.error(_response.Message);

                        return;
                    }

                    _dispatch(Success(_response.Data));
                },
            ).
            catch(_ex => {

                console.error(_ex);

                toast.error("could not get the project items.");
            }).
            finally(() => _dispatch(UIAction.SetVisibilityLoadingPanel(false)));
    };

    function Success(_items) { return { type: Constant.GetAll, Items: _items }; }
}

const Add = (_projectItem) => {

    return _dispatch => {

        ProjectItemService.Add(_projectItem).
            then(
                _response => {

                    if (!_response.Success) {

                        toast.error(_response.Message);

                        return;
                    }

                    _dispatch(Success(_response.Data));
                },
            ).
            catch(_ex => {

                console.error(_ex);

                toast.error("could not add the project item.");
            });
    };

    function Success(_item) { return { type: Constant.Add, Item: _item }; }
}

const Update = (_projectItem) => {

    return _dispatch => {

        ProjectItemService.Update(_projectItem).
            then(
                _response => {

                    if (!_response.Success) {

                        toast.error(_response.Message);

                        return;
                    }

                    _dispatch(Success(_response.Data));
                },
            ).
            catch(_ex => {

                console.error(_ex);

                toast.error("could not update the project item.");
            });
    };

    function Success(_item) { return { type: Constant.Update, Item: _item }; }
}

const Remove = (_id) => {

    return _dispatch => {

        ProjectItemService.Remove(_id).
            then(
                _response => {

                    if (!_response.Success) {

                        toast.error(_response.Message);

                        return;
                    }

                    _dispatch(Success());
                },
            ).
            catch(_ex => {

                console.error(_ex);

                toast.error("could not remove the project item.");
            });
    };

    function Success() { return { type: Constant.Remove, Id: _id }; }
}

export default {
    GetAll,
    Add,
    Update,
    Remove
}
