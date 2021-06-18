
const Products = require('../Models/Products');

/// Creating new product
exports.NewProduct = async(req, res, next) => {
    const Product = await Products.create(req.body);

    res.status(201).json({
        success: true,
        Product
    })
};

exports.getProducts = (req, res, next) => {
    res.status(200).json({
        success : true,
        message : 'This route will show all products in database.'
    })
};

