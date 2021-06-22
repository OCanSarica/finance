const GetRequest = (_url) => {

    return HandleResponse(
        fetch(
            _url,
            {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token_')
                },
            }));
}

const PostRequest = (_url, _data) => {

    return HandleResponse(
        fetch(
            _url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token_')
                },
                body: JSON.stringify(_data)
            }));
}

const PutRequest = (_url, _data) => {

    return HandleResponse(
        fetch(
            _url,
            {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token_')
                },
                body: JSON.stringify(_data)
            }));
}

const DeleteRequest = (_url, _data) => {

    return HandleResponse(
        fetch(
            _url,
            {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token_')
                },
                body: JSON.stringify(_data)
            }));
}

const HandleResponse = (_promise) => {

    return _promise.
        then(_response => {

            if (!_response.ok) {

                if (_response.status === 401) {

                    window.location.href = '/login';

                    return { Success: false };
                }

                return Promise.reject(_response.statusText);
            }

            return _response.json();
        });
}

export const RequestTool = {
    GetRequest,
    PostRequest,
    PutRequest,
    DeleteRequest
}