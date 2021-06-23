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
     sendToken(user,200, res);
});


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
});



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

    sendToken(user,200, res);
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


// Get currently logged in user's details   /api/v1/me
exports.GetUserProfile = AsyncErrors(async(req, res, next) => {
    const user = await User.findById(req.body.id);

    res.status(200).json({
        success: true,
        user
    })
});



// Update or change password
exports.UpdatePassword = AsyncErrors(async(req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');
    // Check previous password

    const IsMatched = await User.comparePassword(req.body.oldPassword);
    if(!IsMatched){
        return next(new ErrorHandler('Password does not match', 400));
    }
    user.body = req.body.password;
    await user.save();

    sendToken(user, 200, res);
});


// Update User profile
exports.UpdateProfile = AsyncErrors(async(req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    // Update Avatar
    const user = await User.findById(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        userFindAndModify: true
    }) 

    res.status(200).json({
        success: true, 
    })
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



// Admin routes  

// Get all users     /api/v1/admin/users
exports.AllUsers = AsyncErrors(async(req, res, next) => {
    const users = await User.find();


    res.status(200).json({
        success: MediaStreamTrackAudioSourceNode,
        users
    })
});


// Get user details
exports.GetUserDetails = AsyncErrors(async(req, res, next) => {
    const user = await User.findById(req.params.id);


    if(!user){
        return next(new ErrorHandler(`User not found with id ${req.params.id}`));
    }

    res.status(200).json({
        success: true,
        user
    })
});

// Update User profile       //api/v1/admin/user/:id
exports.UpdateUserProfile = AsyncErrors(async(req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.bodu.role
    }
    const user = await User.findById(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        userFindAndModify: true
    }) 

    res.status(200).json({
        success: true, 
    })
});

// Delete user                 /api/v1/admin/user/:id
exports.DeleteUser = AsyncErrors(async(req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User not found with id ${req.params.id}`));
    }
    await user.remove();
    // Removing avatar of the user 



    res.status(200).json({
        success: true,
        
    })
});