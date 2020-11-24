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
    ).catch(error => {

            console.log("Error: ", error);
            return error;
        });
};

// Ver los datos del usurio registrado
export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}
// Actualizar usuario
export function putCurrentUser(updateUser) {
    console.log("Por acá entró al método")
    return request({
        url: API_BASE_URL + "/user/",
        method: 'PUT',
        body: JSON.stringify(updateUser)
    });
}

// Buscar proyecto
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
// Buscar un usuario
export function  postSearchUser(search){
    console.log("Por acá entró al postSearch")
    return request({
        url: API_BASE_URL + "/user/search",
        method: 'POST',
        body: JSON.stringify(search)
    });
}

// Gestionar proyecto
export function putProjectLeader(updateProject) {
    console.log("Por acá entró al método putProjectLeader")
    return request({
        url: API_BASE_URL + "/project/leader",
        method: 'PUT',
        body: JSON.stringify(updateProject)
    });
}
// Proyecto activo del lider
export function getActiveProject(){
    return request({
        url: API_BASE_URL + "/project/leader",
        method: 'GET',
        });
}

// Asignar leder por el administrador
export function postAssingLeader(idUsuario) {
    console.log("Por acá entró al método putProjectLeader")
    return request({
        url: API_BASE_URL + "/user/assing_leader",
        method: 'POST',
        body: JSON.stringify(idUsuario)
    });
}

export function getMenbersGroup() {
    console.log("Por acá entró al método putProjectLeader")
    return request({
        url: API_BASE_URL + "/user/group",
        method: 'GET'
    });
}

export function postAssignarMember(user){
    return request({
        url: API_BASE_URL + "/user/assingMember",
        method: 'POST',
        body: JSON.stringify(user)
    });
}

export function postUnAssignarMember(user){
    return request({
        url: API_BASE_URL + "/user/unassingMember",
        method: 'POST',
        body: JSON.stringify(user)
    });
}

