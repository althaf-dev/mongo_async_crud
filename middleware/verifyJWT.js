const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req,res,next)=>{
    const  authHeader = req.headers.authorization || req.headers.Authorization;
    if(!authHeader?.startsWith('Bearer ')){
        consolr.log("return from here");
        return res.sendStatus(401);
    } 
    console.log(`authheader = ${authHeader}`);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded)=>{
            if(err) {
                console.log(err.message);
                return res.sendStatus(403);
            
            }
            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    )
}

module.exports = verifyJWT