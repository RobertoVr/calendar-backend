const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

// api/auth/
const loginUsuario = async (req, resp = response) => {
    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return resp.status(400).send(
                {
                    ok: false,
                    msg: 'El usuario no existe con ese email'
                }
            );
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return resp.status(400).send(
                {
                    ok: false,
                    msg: 'Password incorrecto'
                }
            );
        }

        // Generar el JSON web token
        const token = await generarJWT(usuario.id, usuario.name);

        resp.status(200).send(
            {
                ok: true,
                uid: usuario.id,
                name: usuario.name,
                token
            }
        )

    } catch (error) {
        resp.status(500).send(
            {
                ok: false,
                msg: 'Por favor hable con el administrador'
            }
        );
    }
}

// api/auth/new
const crearUsuario = async (req, resp = response) => {

    try {
        const { email, password } = req.body;

        let usuario = await Usuario.findOne({ email });

        if (!!usuario) {
            return resp.status(400).send(
                {
                    ok: false,
                    msg: 'El usuario ya existe'
                }
            )
        }

        usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();
        // generar el token
        const token = await generarJWT(usuario.id, usuario.name);

        resp.status(201).send(
            {
                ok: true,
                uid: usuario.id,
                name: usuario.name,
                token
            }
        );
    } catch (error) {
        resp.status(500).send(
            {
                ok: false,
                msg: 'Por favor hable con el administrador'
            }
        );
    }
}

// api/auth/renew
const revalidarToken = async (req, resp = response) => {

    const { uid, name } = req;
    const token = await generarJWT(uid, name);

    resp.send(
        {
            ok: true,
            token
        }
    );
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}