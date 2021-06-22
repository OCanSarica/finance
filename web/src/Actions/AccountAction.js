import Constant from '../Constants/AccountConstant';
import UIAction from '../Actions/UIAction';
import { AccountService } from '../Services';
import { toast } from 'react-toastify';

const GetAll = () => {

    return _dispatch => {

        _dispatch(UIAction.SetVisibilityLoadingPanel(true));

        AccountService.GetAll().
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

                toast.error("could not get the accounts.");
            }).
            finally(() => _dispatch(UIAction.SetVisibilityLoadingPanel(false)));
    };

    function Success(_items) { return { type: Constant.GetAll, Items: _items }; }
}

const Add = (_income) => {

    return _dispatch => {

        AccountService.Add(_income).
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

                toast.error("could not add the account.");
            });
    };

    function Success(_item) { return { type: Constant.Add, Item: _item }; }
}

const Update = (_income) => {

    return _dispatch => {

        AccountService.Update(_income).
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

                toast.error("could not update the account.");
            });
    };

    function Success(_item) { return { type: Constant.Update, Item: _item }; }
}

const Remove = (_id) => {

    return _dispatch => {

        AccountService.Remove(_id).
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

                toast.error("could not remove the account.");
            });
    };

    function Success() { return { type: Constant.Remove, Id: _id }; }
}

const GetStatements = (_year) => {

    return _dispatch => {

        _dispatch(UIAction.SetVisibilityLoadingPanel(true));

        AccountService.GetStatements(_year).
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

                toast.error("could not get statements.");
            }).
            finally(() => _dispatch(UIAction.SetVisibilityLoadingPanel(false)));
    };

    function Success(_items) { return { type: Constant.GetStatements, Items: _items }; }
}

const GetStatementDetails = (_year, _month) => {

    return _dispatch => {

        AccountService.GetStatementDetails(_year, _month).
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

                toast.error("could not get the details.");
            });
    };

    function Success(_items) {

        return {
            type: Constant.GetStatementDetails,
            Items: _items,
            DetailPeriod:
                _year +
                "/" +
                (_month.toString().length == 1 ? "0" : "") +
                _month
        };
    }
}

export default {
    GetAll,
    Add,
    Update,
    Remove,
    GetStatements,
    GetStatementDetails
}
