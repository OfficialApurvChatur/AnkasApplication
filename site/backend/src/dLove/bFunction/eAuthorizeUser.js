const ErrorHandler = require('./bErrorHandler');

const authorizeUser = (...roles) => {
    return (request, response, next) => {
        if (!roles.includes(request.user.relation_info.role.title)) next(new ErrorHandler(`Role '${request.user.relation_info.role.title}' is not allowed to access this resource`, 403))
        next()
    }
}

module.exports = authorizeUser;