const express = require("express");

const app = express();

const port = 3000

app.use(express.static(`${__dirname}/dist`));
app.set('views', `${__dirname}/dist`);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', (_, response) => {
    console.log('get')
    response.render(`${__dirname}/dist/index.html`)
});

app.listen(port, () => console.log(`App is listening on port: ${port}`));