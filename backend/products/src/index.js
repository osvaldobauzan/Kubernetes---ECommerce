const app = require('./app');
const config = require('./config');

let PORT = config.PORT 

app.listen(PORT);
console.log('Server listen on port', PORT);