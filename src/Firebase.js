const firebaseConfig = {
  apiKey: 'AIzaSyAssBBEv9KKOeqH0lFVDemuC5FE21-i8lo',
  authDomain: 'fitmeapp-64482.firebaseapp.com',
  databaseURL: 'https://fitmeapp-64482.firebaseio.com',
  storageBucket: 'fitmeapp-64482.appspot.com',
  messagingSenderId: '407537037152',
};

firebase.initializeApp(firebaseConfig);

// const store = firebase.storage().ref();
const db = firebase.database();
// const fileRef = ref.child('test-video.avi');

export {db};
