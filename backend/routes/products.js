const express = require('express')
const router = express.Router();

const {getProducts, NewProduct} = require('../controllers/productController');


router.route('/products').get(getProducts);
router.route('/products/new').post(NewProduct);

module.exports = router;
