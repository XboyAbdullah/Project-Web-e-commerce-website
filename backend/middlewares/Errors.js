const ErrorHandler = require('../utils/ErrorHandler');

module.exports = (req, res, err, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";

    res.status(200).json({
        success: false,
        error: err.stack
    })
};