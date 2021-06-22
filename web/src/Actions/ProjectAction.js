import Constant from '../Constants/ProjectConstant';
import UIAction from './UIAction';
import { ProjectService } from '../Services';
import { toast } from 'react-toastify';

const GetAll = () => {

    return _dispatch => {

        _dispatch(UIAction.SetVisibilityLoadingPanel(true));

        ProjectService.GetAll().
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

                toast.error("could not get the projects.");
            }).
            finally(() => _dispatch(UIAction.SetVisibilityLoadingPanel(false)));
    };

    function Success(_items) { return { type: Constant.GetAll, Items: _items }; }
}

const Get = (_id) => {

    return _dispatch => {

        _dispatch(UIAction.SetVisibilityLoadingPanel(true));

        ProjectService.Get(_id).
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

                toast.error("could not get the project.");
            }).
            finally(() => _dispatch(UIAction.SetVisibilityLoadingPanel(false)));
    };

    function Success(_item) { return { type: Constant.Get, Item: _item }; }
}

const Add = (_project) => {

    return _dispatch => {

        ProjectService.Add(_project).
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

                toast.error("could not add the project.");
            });
    };

    function Success(_item) { return { type: Constant.Add, Item: _item }; }
}

const Update = (_project) => {

    return _dispatch => {

        ProjectService.Update(_project).
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

                toast.error("could not update the project.");
            });
    };

    function Success(_item) { return { type: Constant.Update, Item: _item }; }
}

const Remove = (_id) => {

    return _dispatch => {

        ProjectService.Remove(_id).
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

                toast.error("could not remove the project.");
            });
    };

    function Success() { return { type: Constant.Remove, Id: _id }; }
}

export default {
    GetAll,
    Get,
    Add,
    Update,
    Remove,
}
