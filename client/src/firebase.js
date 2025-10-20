import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMVIBhxBNBC6HD6ln7m9LCtVUSvurahEU",
  authDomain: "mini-project-79868.firebaseapp.com",
  projectId: "mini-project-79868",
  storageBucket: "mini-project-79868.firebasestorage.app",
  messagingSenderId: "135942551701",
  appId: "1:135942551701:web:4cbc2e9f125bf859e6039c",
  measurementId: "G-NZEWXWBPSQ"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };