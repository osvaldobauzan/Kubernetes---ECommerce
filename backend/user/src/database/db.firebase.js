// const firebase = require('firebase');
const config = require('../config');

// const { initializeApp } = require("firebase/app");
const firebase = require('firebase');

// const db = initializeApp(config.firebaseConfig);
// console.log("-----------> "+ config.firebaseConfig.apiKey);
// firebase.firestore().settings({ experimentalAutoDetectLongPolling: true });
// firebase.firestore().settings({ timestampsInSnapshot: true, merge: true });
const db = firebase.initializeApp(config.firebaseConfig);
  // firebase.firestore().settings({ experimentalAutoDetectLongPolling: true });

module.exports = db;