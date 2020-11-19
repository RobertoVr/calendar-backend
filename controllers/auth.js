const { response } = require('express');
const { report } = require('../routes/auth/auth');

const crearUsuario = (req, resp = response) => {

    const { name, email, password } = req.body;

    resp.send({
        ok: true,
        msg: 'Crear usuario',
        name,
        email,
        password
    });
}
const loginUsuario = (req, resp = response) => {
    const { email, password } = req.body;

    resp.send({
        ok: true,
        msg: 'Login',
        email,
        password
    });
}
const revalidarToken = (req, resp = response) => {
    resp.send('revalidarToken');
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}