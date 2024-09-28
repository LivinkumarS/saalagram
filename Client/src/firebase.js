// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const keys = JSON.parse(import.meta.env.VITE_API_KEY);

console.log(keys);


const firebaseConfig = {
  apiKey: keys.VITE_API_KEY,
  authDomain: "saalagrammern.firebaseapp.com",
  projectId: "saalagrammern",
  storageBucket: "saalagrammern.appspot.com",
  messagingSenderId: "568199515543",
  appId: "1:568199515543:web:c6ad6efc490b13ad2fc8d2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
