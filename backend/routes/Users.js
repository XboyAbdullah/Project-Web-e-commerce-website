const express = require('express');
const router = express.Router();
const {RegisterUser, loginUser, forgotPassword, resetPassword, GetUserProfile, UpdatePassword, UpdateProfile, Logout, AllUsers, GetUserDetails, UpdateUserProfile, DeleteUser} = require('../controllers/UserController');
const {AuthUser, AuthRoles} = require('../middlewares/Auth');




router.route('/register').post(RegisterUser);
router.route('/login').post(loginUser);
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/logout').post(Logout);
router.route('/me').get(AuthUser, GetUserProfile);
router.route('/password/update').put(AuthUser, UpdatePassword);
router.route('/me//update').put( AuthUser, UpdateProfile);
router.route('/admin/users').get( AuthUser,AuthRoles('admin'), AllUsers);
router.route('/admin/users/:id').get( AuthUser,AuthRoles('admin'), GetUserDetails).put( AuthUser,AuthRoles('admin'), UpdateUserProfile).delete( AuthUser,AuthRoles('admin'), DeleteUser);

module.exports = router;