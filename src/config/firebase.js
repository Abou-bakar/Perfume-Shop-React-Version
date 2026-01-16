// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6hxnybWHFyuPBEkvZCXJdAAKp_HzqSuc",
  authDomain: "perfume-shop-e1e6e.firebaseapp.com",
  projectId: "perfume-shop-e1e6e",
  storageBucket: "perfume-shop-e1e6e.firebasestorage.app",
  messagingSenderId: "903479171759",
  appId: "1:903479171759:web:563cb68c7b8a682e6c525a",
  measurementId: "G-Y5QV532C0B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)