const { response } = require('express');
const Evento = require('../models/Evento');

const getEventos = (req, resp = response) => {
    resp.send(
        {
            ok: true,
            msg: 'Obtener eventos'
        }
    );
}

const crearEvento = async (req, resp = response) => {

    const evento = new Evento(req.body);

    try {
        evento.user = req.uid;

        const eventoGuardado = await evento.save();
        resp.send({
            ok: true,
            evento: eventoGuardado
        });

    } catch (error) {
        console.log(error);
        resp.send(
            {
                ok: false,
                msg: 'Hable con el Admin'
            }
        )
    }
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