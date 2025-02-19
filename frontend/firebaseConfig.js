import { initializeApp } from "@react-native-firebase/app";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithRedirect,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithCredential,
} from "@react-native-firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD6YwgGgxoZIqTLLLARRvzPJ2EX7muNVgo",
  authDomain: "authentication1-1f950.firebaseapp.com",
  projectId: "authentication1-1f950",
  storageBucket: "authentication1-1f950.firebasestorage.app",
  messagingSenderId: "518815540074",
  appId: "1:518815540074:web:52b0ab4804b97f009d7b13",
  measurementId: "G-JX7SBC3G33",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { app, auth };
