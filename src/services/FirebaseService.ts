import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4bHMYJaBQPRjrGufc9nsi_Z2IoCObeg8",
  authDomain: "water-reminder-3fd80.firebaseapp.com",
  projectId: "water-reminder-3fd80",
  storageBucket: "water-reminder-3fd80.firebasestorage.app",
  messagingSenderId: "334322901377",
  appId: "1:334322901377:web:bd9604f0a0d999a1b18880",
  measurementId: "G-59KQVE8QGE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);