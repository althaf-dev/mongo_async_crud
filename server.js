const http = require('http');
require('dotenv').config()
const path = require('path')
const express = require('express')
const {logger} = require('./middleware/EventLogger');
const cors = require('cors');
const errorHandler = require('./middleware/Errorhandle');
const coreOptions = require('./Config/CorsOptions');
const cookiParser = require('cookie-parser');
const verifyJWT = require('./middleware/verifyJWT');
const mongoose  = require('mongoose')

const app = express();
const connectDb = require('./Config/dbConfig');
const mainRoot = require('./routes/root');
const router = require('./routes/subDir');

connectDb();
app.use(logger);
app.use(cors(coreOptions));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookiParser());
app.use(express.static(path.join(__dirname,'/public')));

app.use('/',mainRoot);
app.use('/register',require('./routes/register'));
app.use('/auth',require('./routes/auth'));
app.use('/refresh',require('./routes/refresh'));
app.use('/logout',require('./routes/logout'))
app.use(verifyJWT);
app.use('/employees',require('./routes/api/employees'));


app.all('*',(req,res)=>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
})
app.use(errorHandler)
mongoose.connection.once('open',()=>{
    console.log("connected to mongoDb");
    app.listen(3000,()=>{console.log('server running on 3000')});
})
