/*
    Rutas de usuario / Auth
    host + /api/auth/
*/
const router = require('express').Router();
const {
    crearUsuario,
    revalidarToken,
    loginUsuario
} = require('../../controllers/auth');

router.post('/', loginUsuario);
router.post('/new', crearUsuario);
router.get('/renew', revalidarToken);

module.exports = router;