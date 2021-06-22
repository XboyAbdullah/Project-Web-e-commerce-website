const AsyncErrors = require('../middlewares/AsyncErrors');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');



// Checks if the user is authenticated or not.
exports.AuthUser = AsyncErrors(async(req,res,next) => {
    const {token} = req.cookie
    if(!token){
        return next(new ErrorHandler('login first to access the resource',401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id);
    next()

})

// Handling user roles
exports.AuthRoles = (...roles) => {
    return(req, res, next) => {
        if (!roles.includes(req.user.role)){
            return next( new Errorhandler(`Role (${req.user.role}) is not allowed to access the resource`, 403));
        }
        next()
    }
};
 