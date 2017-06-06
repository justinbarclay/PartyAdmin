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
let Users = function () {
    let baseRoute = '//www.partyserver.dev/api/users/'
    return {
        save: (data) => {
            const token = window.localStorage.getItem('jwt');
            let units = []
            data.units.forEach(function (element) {
                units.push({
                    unit_attributes: {
                        name: element
                    }
                })
            }, this);
            let part = {
                name: data.name,
                count: data.count,
                room: data.location,
                shelf: data.shelf,
                value: data.value,
                barcode: data.bardcode,
                unit_parts_attributes: units
            }
            return fetch(baseRoute, {
                    headers: new Headers({
                        'Authorization': token,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }),
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify({
                        part: part
                    })
                })
                .then(checkStatus)
                .then(parseJSON)
        },
        get: (id) => {
            const fullpath = baseRoute + `${id}`
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
        },
        delete: (id) => {
            const fullpath = baseRoute + `${id}`
            const token = window.localStorage.getItem('jwt');
            return fetch(fullpath, {
                    headers: new Headers({
                        'Authorization': token,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }),
                    method: 'delete',
                    mode: 'cors',
                })
                .then(checkStatus)
                .then(parseJSON)
        },
        index: () => {
            const path = baseRoute;
            const token = window.localStorage.getItem('jwt');
            return fetch(path, {
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
        }
    }
}

export default Users;