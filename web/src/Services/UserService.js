import { RequestTool } from "../Tools/"
import Config from "../Config"

const Login = (_username, _password) =>
    RequestTool.PostRequest(
        Config.ApiUrl + "/api/token",
        {
            "username": _username,
            "password": _password
        });

const Add = (_newUser) =>
    RequestTool.PostRequest(
        Config.ApiUrl + "/api/user",
        _newUser);

const ChangePassword = (_dto) =>
    RequestTool.PostRequest(
        Config.ApiUrl + "/api/user/ChangePassword",
        _dto);

export const UserService = { Login, Add, ChangePassword };

