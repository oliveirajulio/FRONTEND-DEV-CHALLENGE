function savetoken(token) {
    localStorage.setItem('token', token);
}

function gettoken() {
    return localStorage.getItem("token");
}

function saveuser(usuario) {
    return localStorage.setItem('usuario', JSON.stringify(usuario));
}

function getuser() {
    let userstore = localStorage.getItem("usuario");
    return userstore = JSON.parse(userstore); 
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.open('InitialI.html', '_self');
}
