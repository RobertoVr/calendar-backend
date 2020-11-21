const { response } = require('express');
const Evento = require('../models/Evento');

const getEventos = async (req, resp = response) => {

    const eventos = await Evento.find().populate('user', 'name');

    resp.send(
        {
            ok: true,
            eventos
        }
    );
}

const crearEvento = async (req, resp = response) => {

    const evento = new Evento(req.body);

    try {
        evento.user = req.uid;

        const eventoGuardado = await evento.save();
        resp.status(201).send({
            ok: true,
            evento: eventoGuardado
        });

    } catch (error) {
        console.log(error);
        resp.status(500).send(
            {
                ok: false,
                msg: 'Hable con el Admin'
            }
        );
    }
}

const actualizarEvento = async (req, resp = response) => {
    const { id } = req.params;
    const { uid } = req;

    try {
        const evento = await Evento.findById(id);
        if (!evento) {
            resp.status(404).send(
                {
                    ok: false,
                    msg: 'El evento no exite con ese id'
                }
            )
        }
        
        if (evento.user.toString() !== uid) {
            return resp.status(401).send(
                {
                    ok: false,
                    msg: 'No tienes permisos para editar el evento'
                }
            )
        }

        const newEvent = {
            ...req.body,
            user: uid
        }
        const eventoActualizado = await Evento.findByIdAndUpdate(id, newEvent, { new: true });

        resp.status(200).send(
            {
                ok: true,
                evento: eventoActualizado
            }
        )

    } catch (error) {
        console.log(error);
        resp.status(500).send(
            {
                ok: false,
                msg: 'Hable con el Admin'
            }
        )
    }
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