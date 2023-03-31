import { fileURLToPath, } from 'url';
import ejs from 'ejs'
import express from 'express';
import path from 'path';

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

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`App is listening on port: ${PORT}`));
