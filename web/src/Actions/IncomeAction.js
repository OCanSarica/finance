import Constant from '../Constants/IncomeConstant';
import UIAction from '../Actions/UIAction';
import { IncomeService } from '../Services';
import { toast } from 'react-toastify';

const GetAll = (_year = 0, _month = 0) => {

    return _dispatch => {

        _dispatch(UIAction.SetVisibilityLoadingPanel(true));

        IncomeService.GetAll(_year, _month).
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

                toast.error("could not get the incomes.");
            }).
            finally(() => _dispatch(UIAction.SetVisibilityLoadingPanel(false)));
    };

    function Success(_items) { return { type: Constant.GetAll, Items: _items }; }
}

const Add = (_income) =>{

    return _dispatch => {

        IncomeService.Add(_income).
            then(
                _response => {

                    if (!_response.Success) {

                        toast.error(_response.Message);

                        return;
                    }

                    _dispatch(Success({..._income, Id: _response.Data }));
                },
            ).
            catch(_ex => {

                console.error(_ex);

                toast.error("could not add the income.");
            });
    };

    function Success(_item) { return { type: Constant.Add, Item: _item }; }
}

const Update = (_income) =>{

    return _dispatch => {

        IncomeService.Update(_income).
            then(
                _response => {

                    if (!_response.Success) {

                        toast.error(_response.Message);

                        return;
                    }

                    _dispatch(Success(_income));
                },
            ).
            catch(_ex => {

                console.error(_ex);

                toast.error("could not update the income.");
            });
    };

    function Success() { return { type: Constant.Update, Item: _income }; }
}

const Remove = (_id) =>{

    return _dispatch => {

        IncomeService.Remove(_id).
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

                toast.error("could not remove the income.");
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
