const express = require('express');
const router = express.Router();
const {RegisterUser, loginUser, forgotPassword, resetPassword, Logout} = require('../controllers/UserController');



router.route('/register').post(RegisterUser);
router.route('/login').post(loginUser);
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/logout').post(Logout);





module.exports = router;