import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9gSGtO-R17b3enE41J2urlM62p6PW3Ew",
  authDomain: "flashchat-fb42e.firebaseapp.com",
  databaseURL: "https://flashchat-fb42e.firebaseio.com",
  projectId: "flashchat-fb42e",
  storageBucket: "flashchat-fb42e.appspot.com",
  messagingSenderId: "341920568679",
  appId: "1:341920568679:web:0802d383a1bff6dd530bc2"
};

var fire = firebase.initializeApp(firebaseConfig);
export default fire;
