// var express = require('express');
// var app = express();

// app.get('/', function(req, res) {
//   res.send('Hello World!');
// });

// app.listen(3000, function() {
//   console.log('Example app listening on port 3000!');
// });

const express = require("express");
 
const app = express();
 
app.set("view engine", "hbs");
app.set("views", "src");

app.use("/register", function(_, response){
     
    response.render("pages/register/register.hbs");
});

app.use("/chat", function(_, response){
     
    response.render("pages/chat/chat.hbs");
});

app.use("/profile", function(_, response){
     
    response.render("pages/profile/profile.hbs");
});

app.use("/", function(_, response){
     
    response.render("pages/login/login.hbs");
});

app.listen(3000);