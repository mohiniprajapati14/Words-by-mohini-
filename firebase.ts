import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  projectId: "single-figure-nttsj",
  appId: "1:681050337216:web:8fa520877df7d454a66225",
  apiKey: "AIzaSyCV_b7vn-lZdPvj_ujZnv7ExUV7DweGjz8",
  authDomain: "single-figure-nttsj.firebaseapp.com",
  storageBucket: "single-figure-nttsj.firebasestorage.app",
  messagingSenderId: "681050337216"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
