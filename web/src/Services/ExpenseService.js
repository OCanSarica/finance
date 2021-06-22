import { RequestTool } from "../Tools"
import Config from "../Config"

const _ControllerUrl = "/api/expense";

const GetAll = (_year, _month) =>
    RequestTool.GetRequest(
        Config.ApiUrl + _ControllerUrl + "/" + _year + "/" + _month);

const Add = (_item) =>
    RequestTool.PostRequest(
        Config.ApiUrl + _ControllerUrl,
        _item);

const Update = (_item) =>
    RequestTool.PutRequest(
        Config.ApiUrl + _ControllerUrl,
        _item
    );

const Remove = (_id) => 
    RequestTool.DeleteRequest(Config.ApiUrl + _ControllerUrl + "/" + _id);

export const ExpenseService = { GetAll, Add, Remove, Update };

