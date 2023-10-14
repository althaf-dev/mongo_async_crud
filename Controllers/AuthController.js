// const userDb ={

//     users:require('../Data/user.json'),
//     setUser:function (user){this.users = user}
// }

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Data/User');
// const fsPromise = require('fs').promises;
// const path = require('path');

const handleLogin = async(req,res)=>{

     const {user,psword} = req.body;
     if(!user || !psword){
        return res.status(400).json({'message':'userName & Passowrds are required'})
    }
     const foundUser = await User.findOne({username:user}).exec();
    //  const foundUser =  userDb.users.find(u=>u.username == user);
     if(!foundUser) return res.sendStatus(401);

     const  match = await bcrypt.compare(psword,foundUser.password);
     if(match){

         const roles = Object.values(foundUser.roles);
         const accessToken = jwt.sign({

            "UserInfo":{
                "username":foundUser.username,
                "roles":roles
            }

           

         },
         process.env.ACCESS_TOKEN_SECRET,
         {expiresIn:"30s"}
         );

         const refreshToken = jwt.sign({
            "username":foundUser.username
         },
         process.env.REFRESH_TOKEN_SECRET,
         {expiresIn:"1d"}
         );

        //  const otherUsers = userDb.users.filter(person=>person.username != foundUser.username);
        //  currentUser = {...foundUser,refreshToken};
        //  userDb.setUser([...otherUsers,currentUser]);
        //  await fsPromise.writeFile(path.join(__dirname,'..','Data','user.json'),
        //  JSON.stringify(userDb.users));
         
         await User.updateOne({username:foundUser.username},{$set:{refreshToken:refreshToken}});
         
         res.cookie('jwt',refreshToken,{httpOnly:true,maxAge:24*60*60*1000});
         res.json({accessToken})
     }
     else{
        res.sendStatus(401);
     }
}

module.exports = {handleLogin}