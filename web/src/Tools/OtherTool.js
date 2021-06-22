const ValidateEmail = (_email) => {

    let _result = false;

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(_email)) {

        _result = true;
    }

    return _result;
}

export const OtherTool = {
    ValidateEmail
}