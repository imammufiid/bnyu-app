import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA4bHMYJaBQPRjrGufc9nsi_Z2IoCObeg8",
  authDomain: "water-reminder-3fd80.firebaseapp.com",
  projectId: "water-reminder-3fd80",
  storageBucket: "water-reminder-3fd80.firebasestorage.app",
  messagingSenderId: "334322901377",
  appId: "1:334322901377:web:bd9604f0a0d999a1b18880",
  measurementId: "G-59KQVE8QGE"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
let analytics: ReturnType<typeof getAnalytics> | undefined;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export enum FirestoreCollection {
  reminders = "reminders",
  users = "users",
  points = "points",
  feedback = "feedback",
}

export { analytics, logEvent };