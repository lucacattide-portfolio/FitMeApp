const firebaseConfig = {
  apiKey: 'AIzaSyAssBBEv9KKOeqH0lFVDemuC5FE21-i8lo',
  authDomain: 'fitmeapp-64482.firebaseapp.com',
  databaseURL: 'https://fitmeapp-64482.firebaseio.com',
  storageBucket: 'fitmeapp-64482.appspot.com',
  messagingSenderId: '407537037152',
};

firebase.initializeApp(firebaseConfig);

const store = firebase.storage();
const db = firebase.database();
const auth = firebase.auth();
const TIMESTAMP = firebase.database.ServerValue.TIMESTAMP;
// const fileRef = ref.child('test-video.avi');

export {auth, db, store, TIMESTAMP};
