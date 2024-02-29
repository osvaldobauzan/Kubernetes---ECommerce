const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const whitelist = ['*'];
// Para Auth instalar npm i cookie-parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());
//User
// const userRoutes = require('./routes/user.routes');
const shopRoutes = require('./routes/shop.route');

app.use(express.json());
app.use(cors(
    {origin: '*',
    credentials: true}
));
app.use(bodyParser.json());
app.use(morgan('dev')); // Para poder ver logs del uso en la consola


app.use('/', shopRoutes);


module.exports = app;
