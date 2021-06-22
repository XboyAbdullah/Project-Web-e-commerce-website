const User = require('../Models/User');
const ErrorHandler = require('../utils/ErrorHandler');
const AsyncErrors = require('../middlewares/AsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');












// Registering a user 
exports.RegisterUser = AsyncErrors( async(req, res, next)=> {
    const {name, email, password} = req.body
     const user = await User.create({
         name,
         email,
         password,
         avatar: {
             public_ID:'',
             url:''
         }
     })


     sendToken(user,200, res)
})


// Forgot Password
exports.forgotPassword = AsyncErrors(async(res, req, next) =>{
    const user = await User.findOne({email: req.body.email});
    if(!user){
        return next(new ErrorHandler('User not found with this email', 404));
    }
    // Get reset token
    const resetToken = user.getResetPassword();
    await user.save({validateBeforeSave: false});
    // Create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/api.v1/password/reset/${resetToken}`;
    const message = `Your password reset token is as follows \n\n ${resetUrl}\n\nIf you have not requessted this email then ignore it`;


    try {
        await sendEmail({
            email: user.email, 
            subject: "Password recovery",
            message
        })
        res.status(200).json({
            success: true,
            message: `email is sent to ${user.email}`
        })
        
    } catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave: false});

        return next(new ErrorHandler(error.message, 500));
    }
})

// Login user
exports.loginUser = AsyncErrors(async(res, req, next)=>{
    const {email, password} = req.body;

    //Checking if emaol and password are entered by user
    if(!email || !password) {
        return next(new ErrorHandler('Invalid email or password', 400))
    }
    // Finding user in database
    const user = await User.findOne({email}).select('+password');

    if(!user){
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    // Checking password
    const IsPassMatch = await user.comparePassword(password);

    if(!IsPassMatch){
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    sendToken(user,200, res)
    
});

// reset password
exports.resetPassword = AsyncErrors(async(res, req, next) =>{
    //  Checking token
    const resetPasswordtoken =crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        reasetPasswordToken, 
        resetPasswordExpire: {$gt: Date.now()}
    })
    if(!user){
        return next(new ErrorHandler('Password reset token is invalid or has been expired', 400));
    }
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Password does not match', 400));
    }
    // Setup new password
    user.password =  req.body.password;
    
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken(user, 200, res);

});





//Logout User  /api/v1/logout
exports.Logout = AsyncErrors(async(req, res, next) => {
    res.cookie('token', null, {
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
});
