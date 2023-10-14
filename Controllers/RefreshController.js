// const userDb ={

//     users:require('../Data/user.json'),
//     setUser:function (user){this.users = user}
// }
const User = require('../Data/User');
const jwt = require('jsonwebtoken');


const handleRefreshToken = async(req,res)=>{

     const cookie = req.cookies;
     console.log(`cookies = ${req.cookies.jwt}`);
     if(!cookie?.jwt) return res.sendStatus(401);
     const refreshToken = cookie.jwt;

     const foundUser = await User.findOne({refreshToken:refreshToken}).exec();

    //  const foundUser =  userDb.users.find(u=>u.refreshToken == refreshToken);
     if(!foundUser) return res.sendStatus(401);
     console.log(`founduser = ${foundUser}`);
     jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,
        (err,decoded)=>{
            if(err||foundUser.username!=decoded.username) return res.sendStatus(403);
            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {
                    "UserInfo":{
                        "username":decoded.username,
                        "roles":roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:"30s"}
            
                );
            res.json({accessToken})
        })
   
   
     
}

module.exports = {handleRefreshToken}