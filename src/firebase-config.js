import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDg1q2hDpWfUl-2anFbDn3aU5qvLIzOIZk",
  authDomain: "tester-ad297.firebaseapp.com",
  projectId: "tester-ad297",
  storageBucket: "tester-ad297.appspot.com",
  messagingSenderId: "480941354096",
  appId: "1:480941354096:web:ef3083d78bb18dca8498b5",
  measurementId: "G-98SLFM13XK",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
