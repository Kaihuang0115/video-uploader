<<<<<<< HEAD
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

=======
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";             // ← 新增這行
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// 改成從環境變數讀取（如果你還沒改完，請先把 import.meta.env 部分補上）
>>>>>>> 288b56b (加入 Auth 判斷，只有管理員可上傳/編輯/刪除影片)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
<<<<<<< HEAD
=======
export const auth = getAuth(app);       // ← 新增這行
>>>>>>> 288b56b (加入 Auth 判斷，只有管理員可上傳/編輯/刪除影片)
export const storage = getStorage(app);
export const db = getFirestore(app);
