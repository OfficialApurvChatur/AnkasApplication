const jsonwebtoken = require('jsonwebtoken');
const catchAsyncError = require('./aCatchAsyncError');
const ErrorHandler = require('./bErrorHandler');

const authenticateUser = UserModel => catchAsyncError( async (request, response, next) => {
    // Retrieve
    const { token } = request.cookies

    // Not Found
    if (!token || token === "j:null") {
        return next(new ErrorHandler("Please login to access this resource", 401))
    }

    // Found
    // Decode Token 
    const decodedData = jsonwebtoken.verify(
        token,
        "SADLKASJDKLASJDKLASJDKLASJDKLADJASKLJDAKSLDJSAKLDjASKLDJCJLFKJLFSLKDPOFOW"
    )

    // Save User in Request
    const user = await UserModel.findById(decodedData.id)

    if (!user) {
        return next(new ErrorHandler("User is removed", 401))
    }

    request.user = user._id
    return next()
} )

module.exports = authenticateUser;
