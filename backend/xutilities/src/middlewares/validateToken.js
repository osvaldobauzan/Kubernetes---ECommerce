// Funciones antes que llegen a una ruta

const jwt = require('jsonwebtoken');
const { SECRET } = require('../config.js');

const authRequired = (req, res, next) => {
    // console.log("Middleware: validate");
    const token = req.headers.authorization.split(' ')[1];
    console.log("Middleware: validate token=", token);
    // console.log(SECRET)
    
    // const {token} = req.cookies;

    if ( !token ) {
        return res.status(401).json({message: "No token, authorization denied"});
    } else {
        jwt.verify(token, SECRET, (err, user) =>{
            if (err) return res.status(403).json({message: "Invalid token"});
            req.user = user;
            // req.body.userId = user;
            console.log("next")
            next();
        } );
        
    }
    
}



module.exports = {
    authRequired
}