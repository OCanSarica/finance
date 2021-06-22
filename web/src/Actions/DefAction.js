import Constant from '../Constants/DefConstant';
import UIAction from './UIAction';
import { DefService } from '../Services';
import { toast } from 'react-toastify';

const GetAccountTypes = () => {

    return _dispatch => {

        _dispatch(UIAction.SetVisibilityLoadingPanel(true));
        
        DefService.GetAccountTypes().
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

                toast.error("could not get the account types.");
            }).
            finally(() => _dispatch(UIAction.SetVisibilityLoadingPanel(false)));
    };

    function Success(_items) {

        return {
            type: Constant.GetAccountTypes,
            Items: _items,
        };
    }
}

export default {
    GetAccountTypes
}
