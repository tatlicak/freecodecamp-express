require('dotenv').config();
let express = require('express');
let app = express();

app.use("/public", express.static(__dirname + "/public"));

app.use((req,res,next)=>{
    
    let log = req.method + " " + req.path + " - " + req.ip;
    console.log(log);
    next();
});

app.get('/',(req, res) => {
    path = __dirname + '/views/index.html';
    res.sendFile(path);
});

app.get('/json',(req, res) => {
    let message = "Hello json";
    if (process.env.MESSAGE_STYLE === "uppercase") {

        res.json({"message": message.toUpperCase()});

      } else {

        res.json({"message": message});

      }
    
});

app.get('/now', (req,res,next) => {

    req.time = new Date().toString();

    next();  
}, (req,res) => {

    res.json({"time":req.time})
});


app.get('/:word/echo', (req,res) => {

    res.json({"echo":req.params.word});

});

app.get('/name', (req,res) => {

    firstName = req.query.first;
    lastName = req.query.last;

    res.json({name: `${firstName} ${lastName}`});
});
































 module.exports = app;
