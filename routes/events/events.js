const router = require('express').Router();
const { validarJWT } = require('../../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../../controllers/events');

/*
    Rutas de eventos / Eventos
    host + /api/eventos/
*/
router.get(
    '/',
    validarJWT,
    getEventos
);
// crear un evento
router.post(
    '/',
    validarJWT,
    crearEvento
)
// actualizar evento
router.put(
    '/:id',
    validarJWT,
    actualizarEvento
)
// Borrar evento
router.delete(
    '/:id',
    validarJWT,
    eliminarEvento
)

module.exports = router;