import { RequestTool } from "../Tools"
import Config from "../Config"

const _ControllerUrl = "/api/project";

const GetAll = () =>
    RequestTool.GetRequest(Config.ApiUrl + _ControllerUrl);

const Get = (_id) =>
    RequestTool.GetRequest(Config.ApiUrl + _ControllerUrl + "/" + _id);

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

export const ProjectService = {
    GetAll,
    Get,
    Add,
    Remove,
    Update,
};

