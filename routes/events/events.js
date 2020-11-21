const router = require('express').Router();
const { check } = require('express-validator');
const { validarJWT } = require('../../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../../controllers/events');
const { validarCampos } = require('../../middlewares/validar-campos');
const { isDate } = require('../../helpers/isDate');

// Validar token
router.use(validarJWT);

/*
    Rutas de eventos / Eventos
    host + /api/events/
*/
router.get(
    '/',
    getEventos
);
// crear un evento
router.post(
    '/',
    [
        check('title', 'El titulo es requerido').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento
)
// actualizar evento
router.put(
    '/:id',
    [
        check('title', 'El titulo es requerido').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validarCampos
    ],
    actualizarEvento
)
// Borrar evento
router.delete(
    '/:id',
    eliminarEvento
)

module.exports = router;