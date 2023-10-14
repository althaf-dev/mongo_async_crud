// const userDb = {

//     users: require('../Data/user.json'),
//     setUser: function (user) { this.users = user }
// }
const User = require('../Data/User');
const bcrypt = require('bcrypt');
// const fsPromise = require('fs').promises;
// const path = require('path');

const { json } = require('body-parser');

const handleNewUser = async (req, res) => {

    console.log("api called");
    const { user, psword } = req.body;

    if (!user || !psword) {
        return res.status(400).json({ 'message': 'userName & Passowrds are required' })
    }
    // cheack for duplicate usernames in db
    const duplicate = await User.findOne({username:user}).exec();
    if (duplicate) return res.status(409);

    try {

        const hashedpsword = await bcrypt.hash(psword, 10);
        const result = await User.create({
            "username": user,
            "password": hashedpsword
        });
        console.log(result);

        // userDb.setUser([...userDb.users, newUser]);
        // await fsPromise.writeFile(
        //     path.join(__dirname, '..', 'Data', 'user.json'),
        //     JSON.stringify(userDb.users)
        // );
        console.log(userDb.users);
        res.status(201).json({ 'sucess': `New User ${user} Created ` });

    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }

}

module.exports = { handleNewUser };