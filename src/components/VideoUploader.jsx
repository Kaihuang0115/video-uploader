import React, { useState } from "react";
import { storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function VideoUploader({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadProgress(0);
    setSuccessMessage("");
  };

  const handleUpload = () => {
    if (!file) return;
    const fileName = `${Date.now()}_${file.name}`;
    const fileRef = ref(storage, `videos/${fileName}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    setUploading(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setUploadProgress(percent);
      },
      (error) => {
        console.error("Upload failed:", error);
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await addDoc(collection(db, "videos"), {
          name: file.name,
          url: downloadURL,
          createdAt: serverTimestamp(),
        });

        setSuccessMessage("✅ 上傳成功！");
        setUploading(false);
        setFile(null);
        setUploadProgress(0);

        if (onUploadSuccess) onUploadSuccess();
      }
    );
  };

  return (
    <div className="mb-6 p-4 bg-white rounded shadow w-full max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">📤 上傳你的遊戲 Highlight</h2>
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="block w-full mb-4"
      />
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        上傳影片
      </button>

      {uploading && (
        <div className="w-full bg-gray-200 rounded mt-4">
          <div
            className="bg-green-500 text-xs text-white text-center py-1 rounded"
            style={{ width: `${uploadProgress}%` }}
          >
            {uploadProgress}%
          </div>
        </div>
      )}

      {successMessage && (
        <p className="text-green-600 mt-4 font-medium">{successMessage}</p>
      )}
    </div>
  );
}
