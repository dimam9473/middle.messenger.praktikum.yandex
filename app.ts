import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import ejs from 'ejs'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 3000

app.use(express.static(`${__dirname}/dist`));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.get(/(.*?)/, (_: express.Request, res: express.Response) => {
    res.sendFile(`${__dirname}/dist/index.html`);
});

app.listen(PORT, () => console.log(`App is listening on port: ${PORT}`));
