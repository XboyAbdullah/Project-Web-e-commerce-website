
const Products = require('../Models/Products');
const ErrorHandler = require('../utils/ErrorHandler');


/// Creating new product
exports.NewProduct = async(req, res, next) => {
   const product = await Products.create(req.body);
    console.log("NewProduct");

    res.status(201).json({
        success: true,
        product
    });
};

exports.getProducts = async (req, res, next) => {
    console.log("getProduct");
    const product = await Products.find();
    res.status(200).json({
        success : true,
        count: product.length,
        product
    });
};

// Getting single product details
exports.getSingleproduct = async(req, res, next) => {
    const product = Products.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product not found',404));
    }
    res.status(200).json({
        success: true,
        product
    })
};

// Update Product
exports.updateProduct = async(res, req, next) =>{
    let product = await Products.findById(res.params.id);
    if(!product){
        return res.status(404).json({
            success: false,
            message: "Product not available"
        })
    }
   product = await Products.findByIdAndUpdate(res.params.id, res.body,{
       new: true,
       runValidators:true,
       useFindAndModify: false
   });
   res.status(200).json({
       success: true,
       product
   });
};

// Deleting product
exports.deleteproduct = async(res, req, next) => {
    const product = await Products.findById(res.params.id);
    if(!product){
        return res.status(404).json({
            success: false,
            message: "Product not available"
        })
    }
    await product.remove();

    res.status(200).json({
        success : true,
        message: "Product deleted successfully"
    });

};