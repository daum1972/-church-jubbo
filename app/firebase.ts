import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDaiLllPDSO6IFUCKb7xZU-o_LBwR3F39Q",
  authDomain: "church-jubbo-cfb1d.firebaseapp.com",
  projectId: "church-jubbo-cfb1d",
  storageBucket: "church-jubbo-cfb1d.firebasestorage.app",
  messagingSenderId: "40720564642",
  appId: "1:40720564642:web:3edc9564e25d86c10fb2fb",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);