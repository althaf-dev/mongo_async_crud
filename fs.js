const fsPromises  = require('fs').promises;
const path = require('path')

const fileOps = async()=>{

    try{

        const data = await fsPromises.readFile(path.join(__dirname,'Starter.text'),'utf-8');
        console.log(data);
        await fsPromises.unlink(path.join(__dirname,'Starter.text'));
        await fsPromises.writeFile(path.join(__dirname,'new.text'),data);
    }catch(error){

        console.log(error);
    }
}
fileOps();

// fs.readFile(path.join(__dirname,'Starter.text'),'utf-8' ,(err,data)=>{
//     if(err) throw err;
//     console.log(data)
// })

// fs.writeFile(path.join(__dirname,'Starter.text'),'nice to meet you' ,(err)=>{
//     if(err) throw err;
//     console.log('write complete');
// })

// process.on('uncaughtException',err=>{
//     console.log(err)
// })