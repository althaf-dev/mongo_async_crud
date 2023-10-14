const express = require('express');
const path = require('path');
const router = express.Router();
router.get('^/$|/index(.html)?',(req,res)=>{
    // res.sendFile('./views/index.html',{root:__dirname});
    res.sendFile(path.join(__dirname,'..','views','index.html'));
})

router.get('/new-page(.html)?',(req,res)=>{
    // console.log("new page");
    res.sendFile(path.join(__dirname,'..','views','new-page.html'));
})

router.get('/hello',(req,res,next)=>{
    console.log('loading hello');
    next();
},(req,res)=>{
    res.send("<h1>Hello</h1>");
})

router.get('/old-page',(req,res)=>{

    console.log('redirecting to new page');
    res.redirect(301,'/new-page');
})

module.exports = router;
