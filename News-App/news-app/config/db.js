import firebase from "firebase";

let firebaseConfig = {
  apiKey: "AIzaSyCt8NGIf6ifsMhEG6Dpdnj_EMzQbxLVsWQ",
  authDomain: "news-app-15023.firebaseapp.com",
  databaseURL: "https://news-app-15023.firebaseio.com",
  projectId: "news-app-15023",
  storageBucket: "news-app-15023.appspot.com",
  messagingSenderId: "311661342947",
  appId: "1:311661342947:web:ae877d748d3395782015d6",
  measurementId: "G-FSS311SB94",
};

let app = firebase.initializeApp(firebaseConfig);

export const firebasedb = app.database();


