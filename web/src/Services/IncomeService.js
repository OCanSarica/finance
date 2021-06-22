import { RequestTool } from "../Tools"
import Config from "../Config"

const _ControllerUrl = "/api/income";

const GetAll = (_year, _month) => {

    return RequestTool.GetRequest(
        Config.ApiUrl + _ControllerUrl + "/" + _year + "/" + _month);
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

export const IncomeService = { GetAll, Add, Remove, Update};

