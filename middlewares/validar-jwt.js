const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, resp = response, next) => {
    // x-token headers
    const token = req.header('x-token');
    if (!token) {
        return resp.status(401).send({
            ok: false,
            msg: 'No hay un token en la petición'
        });
    }

    try {
        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid = uid;
        req.name = name;

    } catch (error) {
        console.log(error);
        return resp.status(401).send(
            {
                ok: false,
                msg: 'Token no valido'
            }
        );
    }

    next();
}

module.exports = {
    validarJWT
}