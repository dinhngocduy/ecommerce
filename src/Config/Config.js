import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAc702fchdN3hRchwakn2e7Fiwqm9BPmVw",
  authDomain: "ecommerce-54e0b.firebaseapp.com",
  projectId: "ecommerce-54e0b",
  storageBucket: "ecommerce-54e0b.appspot.com",
  messagingSenderId: "929398900230",
  appId: "1:929398900230:web:9beef615931ddecf3d2587",
  measurementId: "G-M2ZDKLRVC3",
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const fs = firebase.firestore();
const storage = firebase.storage();

export { auth, fs, storage };
