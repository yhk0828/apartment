import {initializeApp} from "firebase/app"
import { getAuth } from "firebase/auth"; // 코드 추가
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCY8hnJzaj0v4mb4OdRy9jHfHNIByn93pk",
  authDomain: "apartment-af4cd.firebaseapp.com",
  projectId: "apartment-af4cd",
  storageBucket: "apartment-af4cd.appspot.com",
  messagingSenderId: "478729543573",
  appId: "1:478729543573:web:73cc680d4507028de7e09c",
  measurementId: "G-CNSWNK27GJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);