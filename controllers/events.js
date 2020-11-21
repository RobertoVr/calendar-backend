const { response } = require('express');

const getEventos = (req, resp = response) => {
    resp.send(
        {
            ok: true,
            msg: 'Obtener eventos'
        }
    );
}

const crearEvento = (req, resp = response) => {
    resp.send(
        {
            ok: true,
            msg: 'Crear eventos'
        }
    );
}

const actualizarEvento = (req, resp = response) => {
    const { id = 't' } = req.params;
    resp.send(
        {
            ok: true,
            msg: 'Actualizar eventos' + id
        }
    );
}

const eliminarEvento = (req, resp = response) => {
    const { id = 't' } = req.params;
    resp.send(
        {
            ok: true,
            msg: 'Eliminar eventos' + id
        }
    );
}


module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}