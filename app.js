const express = require("express");

const app = express();

const port = 3000

app.use(express.static(`${__dirname}/dist`));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get("/*", (_, res) => {
    res.sendFile(`${__dirname}/dist/index.html`);
});

app.listen(port, () => console.log(`App is listening on port: ${port}`));