console.log("node started check");
const { EventEmitter } = require('stream');
const EventLogger = require('./middleware/EventLogger');

const eventEmitter = require('events');

class logEmitter extends EventEmitter {};

const mylogEmitter = new logEmitter();

mylogEmitter.on('logs',(msg)=>{

    EventLogger(msg);
});

let logcount = 00;
while(logcount<30){
    mylogEmitter.emit('logs','server offline');
    logcount++;
}


