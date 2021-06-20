const express = require('express')
const router = express.Router();

const {getProducts, NewProduct, getSingleproduct, updateProduct, deleteproduct } = require('../controllers/productController');


router.route('/products').get(getProducts);
router.route('/products/:id').get(getSingleproduct);
router.route('/admin/products/new').post(NewProduct);
router.route('/admin/products/;id').put(updateProduct);
router.route('/admin/products/;id').put(updateProduct).delete(deleteproduct);

module.exports = router;
