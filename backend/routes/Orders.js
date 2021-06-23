const express = require('express');
const router = express.Router();
const {AuthUser, AuthRoles} = require('../middlewares/Auth');

const {newOrder, GetSingleOrder, MyOrders, AllOrders, AdminUpdateOrder, AdminDeleteOrder} = require('../controllers/OrderController');

router.route('/order/new').post( AuthUser, newOrder);
router.route('/order/:id').get( AuthUser, GetSingleOrder);
router.route('/orders/me').get( AuthUser, MyOrders);
router.route('/admin/orders').get( AuthUser, AuthRoles('admin'), AllOrders);     
router.route('/admin/order/:id').get( AuthUser, AuthRoles('admin'), AdminUpdateOrder).delete( AuthUser, AuthRoles('admin'), AdminDeleteOrder);   
module.exports = router;
