const express = require('express')
const router = express.Router();

const {getProducts, NewProduct, getSingleproduct, updateProduct, deleteproduct, CreateProductReview, GetAllreviews, DeleteReview} = require('../controllers/productController');
const {AuthUser, AuthRoles} = require('../middlewares/Auth');

router.route('/products').get(getProducts);
router.route('/products/:id').get(getSingleproduct);
router.route('/admin/products/new').post(AuthRoles('admin'),AuthUser, NewProduct);
router.route('/admin/products/;id').put(AuthRoles('admin'), AuthUser, updateProduct);
router.route('/admin/products/;id').put(AuthRoles('admin'), AuthUser, updateProduct).delete(deleteproduct);


router.route('/review').put(AuthUser, CreateProductReview);
router.route('/reviews').get(AuthUser, GetAllreviews);
router.route('/reviews').delete(AuthUser, DeleteReview);
module.exports = router;
