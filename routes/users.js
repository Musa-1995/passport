var express = require('express');
const passport = require('passport');
var router = express.Router();
var userController = require('../controller/user.controller');
/* GET users listing. */
router.post('/register', userController.register);
router.post('/login', passport.authenticate("jwt",{session:false}),userController.login);

module.exports = router;
