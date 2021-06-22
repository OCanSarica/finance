import Constant from '../Constants/ExpenseConstant';
import { ExpenseService } from '../Services';
import { toast } from 'react-toastify';
import UIAction from '../Actions/UIAction';

const GetAll = (_year = 0, _month = 0) => {

    return _dispatch => {

        _dispatch(UIAction.SetVisibilityLoadingPanel(true));
        
        ExpenseService.GetAll(_year, _month).
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

                toast.error("could not get the expenses.");
            }).
            finally(() => _dispatch(UIAction.SetVisibilityLoadingPanel(false)));
    };

    function Success(_items) { return { type: Constant.GetAll, Items: _items }; }
}

const Add = (_expense) =>{

    return _dispatch => {

        ExpenseService.Add(_expense).
            then(
                _response => {

                    if (!_response.Success) {

                        toast.error(_response.Message);

                        return;
                    }

                    _dispatch(Success({..._expense, Id: _response.Data }));
                },
            ).
            catch(_ex => {

                console.error(_ex);

                toast.error("could not add the expense.");
            });
    };

    function Success(_item) { return { type: Constant.Add, Item: _item }; }
}

const Update = (_expense) =>{

    return _dispatch => {

        ExpenseService.Update(_expense).
            then(
                _response => {

                    if (!_response.Success) {

                        toast.error(_response.Message);

                        return;
                    }

                    _dispatch(Success(_expense));
                },
            ).
            catch(_ex => {

                console.error(_ex);

                toast.error("could not update the expense.");
            });
    };

    function Success() { return { type: Constant.Update, Item: _expense }; }
}

const Remove = (_id) =>{

    return _dispatch => {

        ExpenseService.Remove(_id).
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

                toast.error("could not remove the expense.");
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
