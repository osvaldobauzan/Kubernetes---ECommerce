const app = require('./app');
const config = require('./config');

const PORT = config.PORT 

app.listen(PORT);
console.log('Server listen on port', PORT);