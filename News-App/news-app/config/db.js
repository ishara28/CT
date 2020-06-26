import firebase from "firebase";

let firebaseConfig = {
  apiKey: "AIzaSyDyGQ1i93ZvJX17F9ZD93OxTUJoSZbS45s",
  authDomain: "ctnews-60027.firebaseapp.com",
  databaseURL: "https://ctnews-60027.firebaseio.com",
  projectId: "ctnews-60027",
  storageBucket: "ctnews-60027.appspot.com",
  messagingSenderId: "761223662936",
  appId: "1:761223662936:web:d0a038498924dbe14ce92d",
  measurementId: "G-1KVLJ24N90",
};

let app = firebase.initializeApp(firebaseConfig);

export const firebasedb = app.database();
