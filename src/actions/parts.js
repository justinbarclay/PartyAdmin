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
let Part = function () {
    let baseRoute = '//www.partyserver.dev/api/'
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
            const fullpath = baseRoute + 'parts/';
            let part = {
                name: data.name,
                count: data.count,
                room: data.location,
                shelf: data.shelf,
                value: data.value,
                barcode: data.bardcode,
                unit_parts_attributes: units
            }
            return fetch(fullpath, {
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
            const fullpath = baseRoute + `parts/${id}`
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
            const fullpath = baseRoute + `parts/${part.id}`
            const token = window.localStorage.getItem('jwt');
        },
        index: () => {
            const path = baseRoute + 'parts';
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

export default Part;