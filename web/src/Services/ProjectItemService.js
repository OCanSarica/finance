import { RequestTool } from "../Tools"
import Config from "../Config"

const _ControllerUrl = "/api/projectitem";

const GetAll = (_projectId) =>
    RequestTool.GetRequest(Config.ApiUrl + _ControllerUrl + "/" + _projectId);

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


export const ProjectItemService = {
    GetAll,
    Add,
    Remove,
    Update
};

