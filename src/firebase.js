import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCt09caATL3qRj30CBzQXq339dGlVDLxqo",
  authDomain: "video-uploader-3fa86.firebaseapp.com",
  projectId: "video-uploader-3fa86",
  storageBucket: "video-uploader-3fa86.firebasestorage.app",
  messagingSenderId: "512965948440",
  appId: "1:512965948440:web:7aa45aa52c01e7c4617f6d"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
