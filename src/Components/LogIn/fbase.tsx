import {initializeApp} from "firebase/app"
import { getAuth } from "firebase/auth"; // 코드 추가
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvD4Sc9_TicR9HjHKCeztbkm3re_o0fIg",
  authDomain: "nwitter-7d1d8.firebaseapp.com",
  databaseURL: "https://nwitter-7d1d8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nwitter-7d1d8",
  storageBucket: "nwitter-7d1d8.appspot.com",
  messagingSenderId: "36624501211",
  appId: "1:36624501211:web:8a4b1bd9d1d540ad82bffe"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);