const generateCookie = (statusCode, message, userKey, user, response) => {
    // Create Token
    const token = user.getAuthenticationToken()

    // Save Token
    const options = {
        exires: new Date(
            Date.now + 5 * 24 * 60 * 60 *1000
        ),
        httpOnly: true,
        secure: true,
        sameSite: "none"
    }

    // Response
    response.status(statusCode).cookie('token', token, options ).json({ 
        // cookie saved in request...
        success: true,
        message: message,
        [userKey]: user,
        token_create: token
    })
} 

module.exports = generateCookie;
