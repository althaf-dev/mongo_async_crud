const http = require('http');
const fspromise = require('fs').promises;
const fs = require('fs')
const path = require('path')
const EventLogger = require('./EventLogger');
const { EventEmitter } = require('stream');
const eventEmitter = require('events');


class logEmitter extends EventEmitter {};
const mylogEmitter = new logEmitter();

mylogEmitter.on('logs',(msg,filename)=>{

    EventLogger(msg,filename);
});
const serveFile = async(filePath,contentType,response)=>{

        try{

            const data = await fspromise.readFile(filePath,!contentType.includes('image')?'utf-8':'');
            response.writeHead(filePath.includes('404.html')?404:200,{'Content-Type':contentType});
            response.end(data);

        }catch(err){
            console.log(err.message);
            mylogEmitter.emit('logs',`err-${err.message}}`,'errorlogs');
            response.statusCode = 500;
            response.end();
        }
}

const server  = http.createServer(async (req,res)=>{
    // if(req.url==='/'){
    //     const content = await fspromise.readFile(path.join(__dirname,'sample.html'),(err)=>{
    //     console.log(err);
    // });
    //     res.end(content); 
    // }
    // else{
    //     let body = '';
    //     req.on('data',(chunk)=>{
    //         body+=chunk;
    //     })
    //     req.on('end',async()=>{
    //         console.log(body.slice(6,))
    //         let data = body.slice(6,).replaceAll('+',' ');
    //         await fspromise.appendFile(path.join(__dirname,'sample1.text'),data);
    //     })
    //     res.end("<h1>saving to server</h1>");
    // }
    const extension = path.extname(req.url);
 
    console.log(req.url);
    let contentType;
    switch(extension){

        case '.css':contentType = 'text/css';
                    break;
        case '.json':contentType = 'application/json';
                    break;
        case '.jpg':contentType = 'image/jpeg';
                    break;
        case '.text':contentType = 'text/plain';
                    break;
        default :contentType = 'text/html';
              
    }
    console.log(contentType);

    let filePath = contentType === 'text/html' && req.url ==='/'?path.join(__dirname,'views','index.html')
        :contentType === 'text/html' && req.url.slice(-1) === '/'?path.join(__dirname,'views',req.url,'index.html')
        :contentType === 'text/html'?path.join(__dirname,'views',req.url):path.join(__dirname,req.url);
    if(!extension && req.url.slice(-1)!=='/') {

        filePath += '.html';
        console.log('adding html');

    }
    mylogEmitter.emit('logs',`req-${req.url}\t${req.method}\t${contentType}\t${path.parse(filePath).base}`,'log');
    const fileExist = fs.existsSync(filePath);
    console.log(filePath);
    if(fileExist){
            console.log('fileExist');
          
            serveFile(filePath,contentType,res);
    }
    else{
        console.log('file does not exist')
        console.log(path.parse(filePath).base);
        switch(path.parse(filePath).base){

            case 'old-page.html':
                res.writeHead(301,{'Location':'/new-page.html'});
                res.end();
                break;
            case 'www-page.html':
                res.writeHead(301,{'Location':'/'});
                res.end();
                break;
            default: serveFile(path.join(__dirname,'views','404.html'),'text/html',res);
                // serve 404 response
        }  
    } 
});
server.listen(3000,()=>{console.log('server running on 3000')});