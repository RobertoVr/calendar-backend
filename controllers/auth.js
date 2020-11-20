const { response } = require('express');

// api/auth/
const loginUsuario = (req, resp = response) => {
    const { email, password } = req.body;

    resp.status(200).send({
        ok: true,
        msg: 'Login',
        email,
        password
    });
}
// api/auth/new
const crearUsuario = (req, resp = response) => {

    const { name, email, password } = req.body;

    resp.status(201).send({
        ok: true,
        msg: 'Crear usuario',
        name,
        email,
        password
    });
}

// api/auth/renew
const revalidarToken = (req, resp = response) => {
    resp.send('revalidarToken');
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}