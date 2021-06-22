import Constant from '../Constants/CreditCardPeriodConstant';
import { CreditCardPeriodService } from '../Services';
import { toast } from 'react-toastify';
import UIAction from '../Actions/UIAction';

const GetAll = (_year = 0, _month = 0) => {

    return _dispatch => {

        _dispatch(UIAction.SetVisibilityLoadingPanel(true));

        CreditCardPeriodService.GetAll(_year, _month).
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

                toast.error("could not get the credit card periods.");
            }).
            finally(() => _dispatch(UIAction.SetVisibilityLoadingPanel(false)));
    };

    function Success(_items) { return { type: Constant.GetAll, Items: _items }; }
}

const Add = (_income) => {

    return _dispatch => {

        CreditCardPeriodService.Add(_income).
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

                toast.error("could not add the credit card period.");
            });
    };

    function Success(_item) { return { type: Constant.Add, Item: _item }; }
}

const Update = (_income) => {

    return _dispatch => {

        CreditCardPeriodService.Update(_income).
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

                toast.error("could not update the credit card period.");
            });
    };

    function Success(_item) { return { type: Constant.Update, Item: _item }; }
}

const Remove = (_id) => {

    return _dispatch => {

        CreditCardPeriodService.Remove(_id).
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

                toast.error("could not remove the credit card period.");
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
