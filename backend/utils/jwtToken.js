// creating token and saving in cookies

const  sendToken = (user, statusCode, res) =>{
    // creating token
    const token = getjwtToken();

    //option for cookie 
    const options = {
        expires:new Date (Date.now + process.env.COOKIE_EXPIRES_TIME * 24 * 60 *60 *1000),
        httpOnly:true 
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user,
        token
    })
} 