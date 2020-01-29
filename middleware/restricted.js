const jwt = require("jsonwebtoken");


const { jwtSecret } = require("../config/secrets");
module.exports = {
    checkLoginStatus,
}

function checkLoginStatus(request, response, next) {
    const token = request.headers.authorization;

    if (token) {
        jwt.verify(token, jwtSecret, (error, decodedToken) => {
            if (error) {
                console.log(error);
                response.status(401).json({ you: "Probably shouldn't pass..." })
            }
            else {
                request.user = { ...decodedToken.user }
                next();
            }
        })
    }
    else {
        response.status(401).json({ message: "Missing authorization header!" })
    }
}