import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAN0A01FDaSolDGVH0qVVwhoijrmSKdJg",
  authDomain: "whos-at-42.firebaseapp.com",
  projectId: "whos-at-42",
  storageBucket: "whos-at-42.firebasestorage.app",
  messagingSenderId: "102114609791",
  appId: "1:102114609791:web:35e5d69a069691e2030d4a",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);