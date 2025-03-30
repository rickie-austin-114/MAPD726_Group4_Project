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
  apiKey: "AIzaSyA-VbIj-dbuEzOhynEXHS4lh_RfYqJpi10",
  authDomain: "mapd726-group4-project.firebaseapp.com",
  projectId: "mapd726-group4-project",
  storageBucket: "mapd726-group4-project.firebasestorage.app",
  messagingSenderId: "252067972937",
  appId: "1:252067972937:web:98f836018471338a04bc98",
  measurementId: "G-ENN7S2K535"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { app, auth };
