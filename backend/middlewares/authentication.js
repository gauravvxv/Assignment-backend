const jwt = require("jsonwebtoken");
require("dotenv").config()

const authenticate = (req,res,next) => {
    const token = req.header('Authorization');

    if(!token){
        console.log("NO TOKEN")
        return res.status(401).send("Authentication Failed")
    }

    try {
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        req.user  = decoded.user;
        console.log("Authentication SuccessFul");
        next();
    } catch (error) {
        console.log("Invalid token",error.message)
        res.status(401).send("Authentication failed Invalid token")
    }
}

module.exports = authenticate;