var express = require("express");
var Parser = require('body-parser');
var model = require('./model');
var bodyParser = Parser.urlencoded({extended: false});
var app = express();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});


app.post('/', bodyParser, function(req, res){
    console.log(req.body.userName);
    model.test(res, req.body.userName, req.body.userAge);
});
app.get('/get', bodyParser, function(req, res){
    console.log(req.query);
    model.testLol(res , req.query);
});
app.get('/more', bodyParser, function(req, res){
    console.log(req.query);      
    model.moreInfo(res , req.query);    
});

app.listen(3000, function(){
    console.log("start");
})