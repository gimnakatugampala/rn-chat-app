import firebase from 'firebase'
require('firebase/auth')

const firebaseConfig = {
    apiKey: "AIzaSyCNOhzf8vuWqYTgbDzE3o4T6_VNiKdpeig",
    authDomain: "signal-clone-cf37f.firebaseapp.com",
    projectId: "signal-clone-cf37f",
    storageBucket: "signal-clone-cf37f.appspot.com",
    messagingSenderId: "164301591873",
    appId: "1:164301591873:web:f255db1846a9160656bdc0"
  };

  let Firebase;

  if (firebase.apps.length === 0) {
    Firebase = firebase.initializeApp(firebaseConfig);
  }

export default Firebase;
