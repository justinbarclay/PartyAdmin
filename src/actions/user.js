import Config from "../../config.json";

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        if (response.status === 401) {
            window.localStorage.clear();
        }
        return Promise.reject(response);
    }
}

function parseJSON(response) {
    return response.json()
}
let User = function () {
    let baseRoute = Config.baseRoute;
    return {
        signup: (user) => {
            const token = window.localStorage.getItem('jwt');
            const path = baseRoute + "signup"
            return fetch(path, {
                    headers: new Headers({
                        'Authorization': token,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }),
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify({
                        user: user
                    })
                })
                .then(checkStatus)
                .then(parseJSON)
        },
        get: (inviteToken) => {
            const fullpath = baseRoute + `users/${inviteToken}`
            const token = window.localStorage.getItem('jwt');
            return fetch(fullpath, {
                    headers: new Headers({
                        'Authorization': token,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }),
                    method: 'GET',
                    mode: 'cors',
                })
                .then(checkStatus)
                .then(parseJSON)
        },
        resetPassword: (user) => {
            const path = baseRoute + "reset_password";
            const token = window.localStorage.getItem('jwt');
            return fetch(path, {
                    headers: new Headers({
                        'Authorization': token,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }),
                    method: 'post',
                    mode: 'cors',
                    body: JSON.stringify({
                        user: user
                    })
                })
                .then(checkStatus)
                .then(parseJSON)
        },
        update: (user) => {
            const fullpath = baseRoute + `${user.id}`
            const token = window.localStorage.getItem('jwt');
            return fetch(fullpath, {
                    headers: new Headers({
                        'Authorization': token,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }),
                    method: 'put',
                    mode: 'cors',
                    body: JSON.stringify({
                        user: user
                    })
                })
                .then(checkStatus)
                .then(parseJSON)
        }
    }
}

export default User;