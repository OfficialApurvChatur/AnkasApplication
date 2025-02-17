const jsonwebtoken = require('jsonwebtoken');
const catchAsyncError = require('./aCatchAsyncError');
const ErrorHandler = require('./bErrorHandler');
const UserModel = require('../aMCR/bCommon/aModel/bAdministration/aUserModel');


const socketAuthenticatedUser = async (error, socket, next) => {
  try {
    // Retrieve
    const { token } = socket.request.cookies

    // console.log("Hello There", token)

    // Not Found
    if (!token) {
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

    socket.user = user
    return next()
  } catch (err) {
    console.log(err)
    return next(new ErrorHandler())
  }
}

module.exports = socketAuthenticatedUser;
