
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
    const resultsPerPage = 8;
    const productCount = await Products.countDocuments();
    const apiFeatures = new ApiFeatures(Products.find(), req.query)
    .search()
    .filter()
    .pagination(resultsPerPage)
    const product = await apiFeatures.query;
    
    res.status(200).json({
        success : true,
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

// Create new review               /api/v1/review
exports.CreateProductReview = AsyncErrors(async(res, req, next) => {
    const {rating, comment, productId} = req.body;


    const review =  {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }
    const product = await Products.findById(productId);
    const Isreviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());
    if(!Isreviewed){
        product.reviews.forEach(review => {
            if(review.user.toString() === req.user._id.toString())
            review.comment = comment;
            review.rating = rating;
        })

    }else{
        product.reviews.push(review);
        product.Number_of_reviews = product.reviews.length
    }

    product.reviews.reduce((acc, item) => item.ratings +acc , 0)/ product.reviews.length;
    await product.save({validateBeforeSave: false});

    res.status(200).json({
        success: true
    })

});

// Get product reviews         /api/v1/review
exports.GetAllreviews = AsyncErrors(async(res, req, next) => {
    const product = await Products.findById(req.query.id);



    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

// Delete product reviews         /api/v1/review
exports.DeleteReview = AsyncErrors(async(res, req, next) => {
    const product = await Products.findById(req.query.productId);
    const review = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

     const numberOfReviews = reviews.length;

    const  ratings  = product.reviews.reduce((acc, item) => item.ratings +acc , 0)/reviews.length;
    
    await product.findById(req.query.productId, {
        reviews,
        ratings,
        numberOfReviews,
    },
    {
        new: true,                                   // To avoid warnings
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true
    })
});