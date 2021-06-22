import UIAction from './UIAction';
import Constant from '../Constants/CreditCardConstant';
import { CreditCardService } from '../Services';
import { toast } from 'react-toastify';

const GetAll = () => {

    return _dispatch => {

        _dispatch(UIAction.SetVisibilityLoadingPanel(true));

        CreditCardService.GetAll().
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

                toast.error("could not get the credit cards.");
            }).
            finally(() => _dispatch(UIAction.SetVisibilityLoadingPanel(false)));
    };

    function Success(_items) { return { type: Constant.GetAll, Items: _items }; }
}

const Add = (_income) => {

    return _dispatch => {

        CreditCardService.Add(_income).
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

                toast.error("could not add the credit card.");
            });
    };

    function Success(_item) { return { type: Constant.Add, Item: _item }; }
}

const Update = (_income) => {

    return _dispatch => {

        CreditCardService.Update(_income).
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

                toast.error("could not update the credit card.");
            });
    };

    function Success(_item) { return { type: Constant.Update, Item: _item }; }
}

const Remove = (_id) => {

    return _dispatch => {

        CreditCardService.Remove(_id).
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

                toast.error("could not remove the credit card.");
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
