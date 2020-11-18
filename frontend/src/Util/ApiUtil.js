import { API_BASE_URL, ACCESS_TOKEN } from '../Global';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);
    console.log(options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            console.log("Response: "+ json);
            return json;
        })
    );
};

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}
export function putCurrentUser(updateUser) {
    console.log("Por acá entró al método")
    return request({
        url: API_BASE_URL + "/user/",
        method: 'PUT',
        body: JSON.stringify(updateUser)
    });
}

export function getSearchProject(search) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    console.log("Por acá entró al postSearch")
    return request({
        url: API_BASE_URL + "/project/show",
        method: 'POST',
        body: JSON.stringify(search)
    });
}
