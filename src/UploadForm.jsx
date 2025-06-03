import React, { useState } from "react";
import { storage, db } from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

export default function UploadForm({ setVideos }) {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    if (!file) return;

    const timestamp = Date.now();
    const storageRef = ref(storage, `videos/${timestamp}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading(true);
    setProgress(0);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(percent);
      },
      (error) => {
        console.error("❌ 上傳錯誤:", error);
        setUploading(false);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        const doc = {
          url,
          name: file.name,
          createdAt: new Date(),
        };
        await addDoc(collection(db, "videos"), doc);
        setVideos((prev) => [doc, ...prev]);
        setUploading(false);
        setProgress(0);
        setFile(null);
      }
    );
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {uploading ? "上傳中..." : "上傳影片"}
      </button>

      {uploading && (
        <div className="mt-2 bg-gray-200 h-4 rounded overflow-hidden">
          <div
            className="bg-green-500 h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
}
