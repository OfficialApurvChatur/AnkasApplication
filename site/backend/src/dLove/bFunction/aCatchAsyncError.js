const catchAsyncError = someFunction => (request, response, next) => {
    Promise.resolve(someFunction(request, response, next)).catch(next)
} 

module.exports = catchAsyncError;
