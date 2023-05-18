import { initializeApp } from "firebase/app";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCG-IecAsWgMfvooAAdj5LzUjmSGwlQAoA",
  authDomain: "contactapp-bbdf2.firebaseapp.com",
  databaseURL: "https://contactapp-bbdf2-default-rtdb.firebaseio.com",
  projectId: "contactapp-bbdf2",
  storageBucket: "contactapp-bbdf2.appspot.com",
  messagingSenderId: "299742501000",
  appId: "1:299742501000:web:ec4d48a686b349c13d273d",
  measurementId: "G-NBF2JXGV10",
};

const firebaseApp = initializeApp(firebaseConfig);

export { firebaseApp };
