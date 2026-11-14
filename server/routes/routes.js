const router = require('express').Router();

const userController = require('../controller/user.controller');

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);

// TODO: placeholder routes, not implemented yet. Express 5 throws if a route
// has no handler, so these stay commented out until handlers are written.
// router.post('/getAirport/:iata', handler);
// router.post('/schedules/:iata/arrivals', handler);
// router.post('/schedules/:iata/departures', handler);

module.exports = router;
