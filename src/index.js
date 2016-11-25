// Definizione path inclusioni

// TODO: Path statica per attingere direttamente da node_modules
// per evitando duplicati - non funziona. Forse sovrascritta, Verificare.

// app.use('jquery-mobile',
// express.static(__dirname + '/node-modules/jquery-mobile/dist/'));

// Importazione moduli
let $ = require('./jquery');
$.mobile = require('./jquery-mobile');
let firebase = require('./firebase');

// TODO: ESlint da errore con questa direttiva. Verificare
// import { firebase } from './firebase';

// Inizializzazione Firebase
firebase.config = {
  apiKey: 'AIzaSyAssBBEv9KKOeqH0lFVDemuC5FE21-i8lo',
  authDomain: 'fitmeapp-64482.firebaseapp.com',
  databaseURL: 'https://fitmeapp-64482.firebaseio.com',
  storageBucket: 'fitmeapp-64482.appspot.com',
  messagingSenderId: '407537037152',
};
firebase.initializeApp(config);
