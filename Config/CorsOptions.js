const whitelist = [
    'https://www.google.co.in',
    'http://localhost:3000/',
    'http://127.0.0.1:3000'
];
const coreOptions = {
    origin:(origin,callback)=>{
        if(whitelist.indexOf(origin)!==-1 ||!origin){
            callback(null,true);
        }
        else{
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionSuccessStatut:200
}
module.exports = coreOptions