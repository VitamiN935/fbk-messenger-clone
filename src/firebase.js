import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCJDZ0nVBikORf34qn-xmuqPBmEgMjymDQ",
  authDomain: "facebook-messenger-clone-fee9d.firebaseapp.com",
  databaseURL: "https://facebook-messenger-clone-fee9d.firebaseio.com",
  projectId: "facebook-messenger-clone-fee9d",
  storageBucket: "facebook-messenger-clone-fee9d.appspot.com",
  messagingSenderId: "410039734715",
  appId: "1:410039734715:web:0c67231759d1042605749e",
  measurementId: "G-14RS5HH5V8"
})

const db = firebaseApp.firestore()

export {db}