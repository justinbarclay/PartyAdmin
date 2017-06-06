function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}

function parseJSON(response) {
    return response.json()
}
let User = function () {
    let baseRoute = '//www.partyserver.dev/api/';
    //let baseRoute = '//localhost:35012/api/admin/';
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
        update: (part) => {
            console.log(part)
            const fullpath = baseRoute + `${part.id}`
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
                        part: part
                    })
                })
                .then(checkStatus)
                .then(parseJSON)
        }
    }
}

export default User;