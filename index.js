require('dotenv').config({
    path: process.env.NODE_ENV === 'dev' ? '.env.development' : '.env'
})

const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);
