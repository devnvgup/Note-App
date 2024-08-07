// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUVMA1qxouvlWy3hohkoGgnxplh-88lLg",
  authDomain: "note-app-38a1f.firebaseapp.com",
  projectId: "note-app-38a1f",
  storageBucket: "note-app-38a1f.appspot.com",
  messagingSenderId: "67763668017",
  appId: "1:67763668017:web:bf1a33f19e941589464110",
  measurementId: "G-YY3PLT99C3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);