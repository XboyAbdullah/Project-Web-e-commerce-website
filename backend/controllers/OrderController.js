const  Order = require('../Models/Orders');
const Products = require('../Models/Products');
const ErrorHandler = require('../utils/ErrorHandler');
const AsyncErrors = require('../middlewares/AsyncErrors');

// Create new order    => /api.v1/order/new
exports.newOrder = AsyncErrors( async(res, req, next) => {
    const{
        orderItems,
        shippingInfo,
        itemsPrice,
        taxprice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxprice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user.id
    })
    res.status(200).json({
        success: true,
        order
    })
});


// get single order            => /api/v1/order/:id
 exports.GetSingleOrder = AsyncErrors( async(res, req, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if(!order){
        return next(new ErrorHandler('No order found with this ID', 404))
    }
    res.status(200).json({
        success: true,
        order
    })
 });

// get logged in user orders            => /api/v1/order/:id
 exports.MyOrders = AsyncErrors( async(res, req, next) => {
    const order = await Order.find({user: req.user.id});

    res.status(200).json({
        success: true,
        order
    })

 });


// get all orders     ADMIN      => /api/v1/admin/orders
 exports.AllOrders = AsyncErrors( async(res, req, next) => {
    const order = await Order.find();
    let totalAmount = 0;
    order.forEach(order => {
        totalAmount  += order.totalPrice;
    })
    res.status(200).json({
        success: true,
        totalAmount, 
        order
    })
 });


//Update or proces order   ADMIN     => /api/v1/admin/order/:id
 exports.AdminUpdateOrder = AsyncErrors( async(res, req, next) => {
    const order = await Order.findById(req.params.id);
    
    if(order.orderStatus === 'Delivered'){
        return next(new ErrorHandler('You have already delivered this order',400));
    }
    order.orderItems.forEach(async item  => {
        await UpdateStock(item.product, item.quantity)
    })
    order.orderStatus = req.body.status,
    order.deliveredAt = Date.now()

    await order.save();

    res.status(200).json({
        success: true,
    })

 });


async function UpdateStock(id, quantity){
    const product = await Products.findById(id);
    product.stock = product.stock - quantity;
    await product.save({validateBeforeSave: false});
};

// Delete order      ADMIN      => /api/v1/adminorder/:id
 exports.AdminDeleteOrder = AsyncErrors( async(res, req, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if(!order){
        return next(new ErrorHandler('No order found with this ID', 404))
    }
    await order.remove();
     
    res.status(200).json({
        success: true,
    })
 });




