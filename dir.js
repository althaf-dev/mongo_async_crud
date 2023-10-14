const fs = require('fs');

if(!fs.existsSync('new')){
    fs.mkdir('new',(err)=>{
    if(err) throw err;
    console.log('directory created');
})

process.on('uncaughtException',err=>{
    console.log(err.message);
})
}
else{
    console.log('directory already exist');
    fs.rmdir('new',(err)=>{
        if(err) throw err;
        console.log('directory removed')
    })
}
