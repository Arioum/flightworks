const router = require('express').Router();

const userController = require('../controller/user.controller');

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);

router.post('/getAirport/:iata');
router.post('/schedules/:iata/arrivals');
router.post('/schedules/:iata/departures');

module.exports = router;
