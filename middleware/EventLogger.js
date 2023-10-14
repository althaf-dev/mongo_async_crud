const fsPromises = require('fs').promises;
const fs = require('fs')
const dateFns = require('date-fns')
const {v4:uuid} = require('uuid')
const path = require('path')


const EventLogger = (msg,filename)=>{

    const dateTime = dateFns.format(new Date(),'yyyy/mm/dd\thh:mm:ss');
    const logItem  = dateTime+'\t'+uuid()+"\t"+msg+"\n";
    console.log(logItem);
    try{
        if(!fs.existsSync('logs')){
            fs.mkdir('logs',(err)=>{
                console.log(err)
            })
        }
        fsPromises.appendFile(path.join(__dirname,'..','logs',`${filename}.text`),logItem);
    }catch(err){
        console.log(err);
    }
}

const logger = (req,res,next)=>{
    EventLogger(`${req.method}\t${req.headers.origin}\t${req.url}`,'reqLog');
    console.log(`${req.url}\t${req.method}\t${req.path}`);
    next();
}
module.exports =  {EventLogger,logger};

