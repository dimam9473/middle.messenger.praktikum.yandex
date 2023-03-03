const express = require("express");
const hbs = require("hbs");
 
const app = express();
const port = 3000
 
app.set("views", "src");
hbs.registerPartials(`${__dirname}/src/components`);
app.set("view engine", "hbs");

app.use(express.static('index.html'));

app.get("/", function(_, response){
    response.render("pages/login/login.hbs");
});

app.get("/register", function(_, response){
     
    response.render("pages/register/register.hbs");
});

app.get("/chat", function(_, response){
     
    response.render("pages/chat/chat.hbs");
});

app.get("/profile", function(_, response){
     
    response.render("pages/profile/profile.hbs");
});

app.get("*", (_, response) => {
    response.status(404).render("pages/404/404.hbs");
    response.status(500).render("pages/500/500.hbs");
  });
    

app.listen(port, function () {
    console.log(`App listening on port: ${port}`)
});