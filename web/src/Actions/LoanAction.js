import Constant from '../Constants/LoanConstant';
import UIAction from '../Actions/UIAction';
import { LoanService } from '../Services';
import { toast } from 'react-toastify';

const GetAll = () => {

    return _dispatch => {

        _dispatch(UIAction.SetVisibilityLoadingPanel(true));

        LoanService.GetAll().
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

                toast.error("could not get the loans.");
            }).
            finally(() => _dispatch(UIAction.SetVisibilityLoadingPanel(false)));
    };

    function Success(_items) { return { type: Constant.GetAll, Items: _items }; }
}

const Add = (_income) => {

    return _dispatch => {

        LoanService.Add(_income).
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

                toast.error("could not add the loan.");
            });
    };

    function Success(_item) { return { type: Constant.Add, Item: _item }; }
}

const Update = (_income) => {

    return _dispatch => {

        LoanService.Update(_income).
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

                toast.error("could not update the loan.");
            });
    };

    function Success(_item) { return { type: Constant.Update, Item: _item }; }
}

const Remove = (_id) => {

    return _dispatch => {

        LoanService.Remove(_id).
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

                toast.error("could not remove the loan.");
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
