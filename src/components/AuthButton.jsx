// src/components/AuthButton.jsx
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function AuthButton() {
  const [user, setUser] = useState(null);

  // 偵聽登入狀態
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Google 登入
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("登入失敗：", err);
    }
  };

  // 登出
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("登出失敗：", err);
    }
  };

  return (
    <div>
      {user ? (
        <div className="flex items-center space-x-2">
          <img src={user.photoURL} alt="avatar" className="w-6 h-6 rounded-full" />
          <span className="text-sm">{user.displayName}</span>
          <button
            onClick={handleSignOut}
            className="ml-2 px-2 py-1 bg-gray-200 rounded text-sm"
          >
            登出
          </button>
        </div>
      ) : (
        <button
          onClick={handleGoogleSignIn}
          className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
        >
          Google 登入
        </button>
      )}
    </div>
  );
}
