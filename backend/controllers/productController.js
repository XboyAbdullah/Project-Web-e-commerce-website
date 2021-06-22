
const Products = require('../Models/Products');
const ErrorHandler = require('../utils/ErrorHandler');
const AsyncErrors = require('../middlewares/AsyncErrors');
const ApiFeatures = require('../utils/APIfeatures');

/// Creating new product
exports.NewProduct = AsyncErrors(async(req, res, next) => {

    req.body.user = req.user.id;                      // getting user ID to show User name as a reference 

   const product = await Products.create(req.body);
    console.log("NewProduct");

    res.status(201).json({
        success: true,
        product
    });
});

exports.getProducts = AsyncErrors(async (req, res, next) => {
    const resultsPerPage = 4;
    const productCount = await Products.countDocuments();
    const apiFeatures = new ApiFeatures(Products.find(), req.query)
    .search()
    .filter()
    .pagination(resultsPerPage)
    const product = await apiFeatures.query;
    
    res.status(200).json({
        success : true,
        count: product.length,
        productCount,
        product
    });
});

// Getting single product details
exports.getSingleproduct = AsyncErrors(async(req, res, next) => {
    const product = Products.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product not found',404));
    }
    res.status(200).json({
        success: true,
        product
    })
});

// Update Product
exports.updateProduct = AsyncErrors(async(res, req, next) =>{
    let product = await Products.findById(res.params.id);
    if(!product){
         return next(new ErrorHandler('Product not found',404));
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
});

// Deleting product
exports.deleteproduct = AsyncErrors(async(res, req, next) => {
    const product = await Products.findById(res.params.id);
    if(!product){
         return next(new ErrorHandler('Product not found',404));
    }
    await product.remove();

    res.status(200).json({
        success : true,
        message: "Product deleted successfully"
    });
});