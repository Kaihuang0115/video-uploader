import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { storage, db } from "../firebase";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

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
}