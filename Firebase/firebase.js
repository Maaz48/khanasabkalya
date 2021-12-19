import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  addDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  uploadString,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDFf7ZTjNlbLbeWZAMr1Lm7QxYI4nZsFMw",
  authDomain: "nativehackathonapp.firebaseapp.com",
  projectId: "nativehackathonapp",
  storageBucket: "nativehackathonapp.appspot.com",
  messagingSenderId: "827316191599",
  appId: "1:827316191599:web:8bfdfa7793aba066aea89a",
});

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  db,
  doc,
  setDoc,
  getDoc,
  addDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  onSnapshot,
  storage,
  ref,
  uploadBytes,
  uploadString,
  uploadBytesResumable,
  getDownloadURL,
};
