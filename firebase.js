import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYaTPLdCf8s4u06ALoR4UsXcUFBCpplZ0",
  authDomain: "blogapp-firbase.firebaseapp.com",
  projectId: "blogapp-firbase",
  storageBucket: "blogapp-firbase.appspot.com",
  messagingSenderId: "410249321118",
  appId: "1:410249321118:web:e0978f0ef260583e30798f",
  measurementId: "G-DE4FLLCE6D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = GoogleAuthProvider();
const storage = getStorage();
const db = getFirestore(app);//firestroe
