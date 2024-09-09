const jwt=require("jsonwebtoken");
const {JWT_SECRET}=require('../config');
// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    //every key is converted to lower case so not Authorization
    const token=req.headers.authorization;
    if (!token) {
        return res.status(403).json({ msg: 'Token missing' });
    }

    //Bearer token in headers is like
    // "Bearer youToken"
    //so we convert/split it into array based on " "
    //and then extract the token from it
    const words=token.split(" ");
    const jwtToken=words[1];
    // JWT prevents hitting data base call for user check up/authentication
    //check if the user's token is valid
    console.log("secret key is "+JWT_SECRET);
    try {
        // Verify the token using the secret key
        const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
        //this decodedValue is the data we have encoded in the token
        if (decodedValue.username) {
            console.log('The decoded value is ');
            console.log(decodedValue);
             req.username = decodedValue.username;
            next(); // Move to the next middleware or route handler if valid
        } else {
            res.status(403).json({ msg: 'You are not authenticated' });
        }
    } catch (error) {
        res.status(403).json({ msg: 'Invalid token' });
    }
}

module.exports = adminMiddleware;