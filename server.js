import Express from 'express';
import path from 'path';
import db from './db/db.js';
import ServerAuthorization from './authorization.js';
import getDirname from './dirname.js';

const server = new Express();
const authorization = new ServerAuthorization();
const port = process.env.PORT;
const htmlPath = path.join(getDirname(), 'public/html');

server.use(Express.json());
server.use(Express.urlencoded({ extended: true }));
server.use(Express.static('public'));

export default server;

server.get('/authorization', async (req, res) => {
    try {
        await res.status(200);
        res.setHeader('Content-Type', 'text/html');
        await res.sendFile('authorization.html', { root: htmlPath });
    }
    catch (error) {
        await res.status(404);
        console.log(error);
    }
});

server.post('/authorization', async (req, res) => {
    try {
        const data = req.body.data;
        console.log(req.body.data);

        const user = await authorization.authorizeUser(data);
        console.log(user);
        res.send(JSON.stringify(user));
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

server.get('/registration', async (req, res) => {
    try {
        await res.status(200);
        res.setHeader('Content-Type', 'text/html');
        await res.sendFile('registration.html', { root: htmlPath });
    }
    catch (error) {
        await res.status(404);
        console.log(error);
    }
});

server.post('/registration', async (req, res) => {
    try {
        const data = req.body.data;
        console.log(req.body.data);

        const user = await authorization.registerUser(data);
        console.log(data);
        res.send(JSON.stringify(user));
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

async function start() {
    try {
        await db.authenticate();
        await db.sync();
        server.listen(port, () => console.log(`Сервер запущен! Порт: ${port}`));
    }
    catch (error) {
        console.log(error);
    }
}

start();