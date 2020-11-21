const router = require('express').Router();
const authRoute = require('./auth/auth');
const eventoRoute = require('./events/events');

router.use('/auth', authRoute);
router.use('/events', eventoRoute);

module.exports = router;