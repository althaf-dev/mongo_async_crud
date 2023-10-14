
const {EventLogger} = require('./EventLogger');


const errorHandler =(err,req,res,next)=>{
    EventLogger(`${err.name}:${err.message}`,'errorLog');
    console.log(err.stack);
    res.status(500).send(`<small>${err.message}</small>`);
}

module.exports = errorHandler;