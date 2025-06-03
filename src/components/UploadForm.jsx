<<<<<<< HEAD
import React, { useState } from "react";
=======
// src/components/UploadForm.jsx
import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";         // 新增
>>>>>>> 288b56b (加入 Auth 判斷，只有管理員可上傳/編輯/刪除影片)
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { storage, db } from "../firebase";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
<<<<<<< HEAD
=======
  const [currentUser, setCurrentUser] = useState(null); // 用來存目前登入者

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);
>>>>>>> 288b56b (加入 Auth 判斷，只有管理員可上傳/編輯/刪除影片)

  const handleChange = e => {
    const f = e.target.files[0];
    if (f) setFile(f);
  };

  const handleUpload = () => {
    if (!file) {
      alert("請先選擇檔案！");
      return;
    }
    const storageRef = ref(storage, `/highlights/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      snapshot => {
        const pct = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.floor(pct));
      },
      err => console.error("上傳錯誤：", err),
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        await addDoc(collection(db, "videos"), {
          name: file.name,
          url,
          createdAt: serverTimestamp()
        });
        setProgress(0);
        setFile(null);
      }
    );
  };

<<<<<<< HEAD
=======
  // 如果尚未登入或 UID 不符合管理員，就顯示提示文字
  if (!currentUser || currentUser.uid !== "QGp2BlVY7FfA7HRytVgLsACwKR13") {
    return (
      <div className="p-4 border rounded max-w-md mx-auto text-center text-gray-600">
        <p>請先以管理員帳號登入才能上傳影片。</p>
      </div>
    );
  }

  // 管理員才看得到下面的上傳表單
>>>>>>> 288b56b (加入 Auth 判斷，只有管理員可上傳/編輯/刪除影片)
  return (
    <div className="p-4 border rounded max-w-md mx-auto">
      <input type="file" accept="video/*" onChange={handleChange} />
      <button
        type="button"
        onClick={handleUpload}
        className="ml-2 p-1 bg-blue-500 text-white rounded"
      >
        Upload
      </button>
      {progress > 0 && <p>Uploading: {progress}%</p>}
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 288b56b (加入 Auth 判斷，只有管理員可上傳/編輯/刪除影片)
