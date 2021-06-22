import { RequestTool } from "../Tools"
import Config from "../Config"

const _ControllerUrl = "/api/creditcardinstallment";

const GetAll = () => {

    return RequestTool.GetRequest(Config.ApiUrl + _ControllerUrl);
}

const Add = (_item) => {

    return RequestTool.PostRequest(
        Config.ApiUrl + _ControllerUrl, 
        _item);
}

const Update = (_item) => {

    return RequestTool.PutRequest(
        Config.ApiUrl + _ControllerUrl,
        _item
    );
}

const Remove = (_id) => {

    return RequestTool.DeleteRequest(Config.ApiUrl + _ControllerUrl + "/" + _id);
}

export const CreditCardInstallmentService = { GetAll, Add, Remove, Update};

