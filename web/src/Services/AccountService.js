import { RequestTool } from "../Tools"
import Config from "../Config"

const _ControllerUrl = "/api/account";

const GetAll = () =>
    RequestTool.GetRequest(Config.ApiUrl + _ControllerUrl);

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


const GetStatements = (_year) => 
    RequestTool.GetRequest(Config.ApiUrl + _ControllerUrl + "/statements/" + _year);

const GetStatementDetails = (_year, _month) =>
    RequestTool.GetRequest(
        Config.ApiUrl + _ControllerUrl + "/statement/" + _year + "/" + _month);

export const AccountService = {
    GetAll,
    Add,
    Remove,
    Update,
    GetStatements,
    GetStatementDetails
};

