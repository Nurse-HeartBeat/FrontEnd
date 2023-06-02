// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-7rUVhrMcgpR18Vt0OiPZTqaMXHSa-us",
  authDomain: "heartbeat-98df9.firebaseapp.com",
  projectId: "heartbeat-98df9",
  storageBucket: "heartbeat-98df9.appspot.com",
  messagingSenderId: "580006034241",
  appId: "1:580006034241:web:d338c2802f8adb80997fc0",
  measurementId: "G-JPPSVYW0M2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export default auth;



