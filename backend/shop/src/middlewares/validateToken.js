// Funciones antes que llegen a una ruta

const jwt = require('jsonwebtoken');
const { SECRET } = require('../config.js');

const authRequired = (req, res, next) => {
    console.log("validate token");
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    
    // const {token} = req.cookies;

    if ( !token ) {
        console.log("==401===")
        return res.status(401).json({message: "No token, authorization denied"});
    } else {
        jwt.verify(token, SECRET, (err, user) =>{
            console.log("==Else===")
            if (err) return res.status(403).json({message: "Invalid token"});
            req.user = user;
            // req.body.userId = user;
            next();
        } );
    }
    
}


module.exports = {
    authRequired
}