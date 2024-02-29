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

// const communityRoutes = require('./routes/utilities.routes')
// app.use('/', communityRoutes);

const xutilitesRoutes = require('./routes/xutilities.routes')
app.use('/', xutilitesRoutes)



module.exports = app;
