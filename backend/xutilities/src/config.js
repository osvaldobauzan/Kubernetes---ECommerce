const dotenv = require('dotenv');
dotenv.config({path: './src/.env'})
// dotenv.config();


const {PORT} = process.env;
const {SECRET} = process.env;
const {
  HOST,
  USER,
  PASSWORD,
  DATABASE,
  TIMEOUT
} = process.env;


const config = {
    db: {
      host: HOST,
      user: USER,
      password: PASSWORD,
      database: DATABASE,
      connectTimeout: TIMEOUT
    },
    listPerPage: 10,
  };
  
  // ------- Firestore

const {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
} = process.env;


module.exports = {
  SECRET,
  PORT,
  config,
  firebaseConfig: {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID
}
}