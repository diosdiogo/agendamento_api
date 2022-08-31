require('dotenv').config({
    path: process.env.NODE_ENV === 'dev' ? '.env.development' : '.env'
})

const express = require('express');
const bodyParse = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const morgan = require('morgan');
const jwt = require('jsonwebtoken');

app.use(bodyParse.urlencoded({ extends: false }));
app.use(bodyParse.json());

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_HOST).then(() => {
    useMongoClient: true
    console.log("DATABASE Connected...")
}).catch((err) => {
    console.log("ERROR " + err)
})

//ROTAS
const path = require("path"); //diretório

app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '**')
    res.header('Access-Control-Allow-Header', 
                'Origin, X-Requerested, Content-Type, Accept, Authorization')
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    app.use(cors());
    next();
})

app.use(morgan('dev'))

app.get('/app', ((req, res, next) => {
    res.render('home', ({ app: process.env.APP_NAME }))
}));

app.get('/gerarToken', (req, res, next) => {
    const token = jwt.sign({
        id: 1,
    }, process.env.JWT_KEY, { expiresIn: '24h' })

    res.status(200).send({
        response: token,
    })
})
app.use((req, res, next) => {
    const erro = new Error('Rota não encontrada')
    res.status(404)
    next(erro)
    res.render('home', ({ app: process.env.APP_NAME }))
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    console.log(error)
    return res.send({
        erro: {
            mensagem: error.mensagem
        }
    })
})

module.exports = app