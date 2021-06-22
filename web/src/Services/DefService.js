import { RequestTool } from "../Tools"
import Config from "../Config"

const GetAccountTypes = () =>
    RequestTool.GetRequest(Config.ApiUrl + "/api/account/GetTypes");

export const DefService = {
    GetAccountTypes
};

