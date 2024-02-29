const express = require('express');
// const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();



app.use(express.json());
app.use(cors(
    {origin: '*',
    credentials: true}
));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }))

// app.use(morgan('dev')); // Para poder ver logs del uso en la consola

const productRoutes = require('./routes/product.routes');
app.use('/', productRoutes);

module.exports = app;
