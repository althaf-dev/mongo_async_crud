// const userDb ={

//     users:require('../Data/user.json'),
//     setUser:function (user){this.users = user}
// }

// const fsPromise = require('fs').promises;
// const path = require('path');

// const jwt = require('jsonwebtoken');
// require('dotenv').config();

const User = require('../Data/User');
const handleLogout = async(req,res)=>{

     const cookie = req.cookies;
     console.log(req.cookies);
     if(!cookie?.jwt) return res.sendStatus(204);

     const refreshToken = cookie.jwt;

     const foundUser =  await User.findOne({refreshToken:refreshToken}).exec();
    //  const foundUser =  userDb.users.find(u=>u.refreshToken == refreshToken);

     if(!foundUser) {

        res.clearCookie('jwt',{httpOnly:true});
        return res.sendStatus(204); 

    }
    
    //  const otherUsers = userDb.users.filter(person=>person.refreshToken != foundUser.refreshToken);
    //  console.log(foundUser)
    //  currentUser = {...foundUser,refreshToken:''};
    //  userDb.setUser([...otherUsers,currentUser]);
    //  await fsPromise.writeFile(path.join(__dirname,'..','Data','user.json'),JSON.stringify(userDb.users));
     await User.updateOne({username:foundUser.username},{$set:{refreshToken:refreshToken}});
     res.clearCookie('jwt',{httpOnly:true}).sendStatus(200);

   
   
     
}

module.exports = {handleLogout}