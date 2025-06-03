// src/App.jsx
import React from "react";
import AuthButton from "./components/AuthButton";       // ← 新增
import UploadForm from "./components/UploadForm";
import VideoGallery from "./components/VideoGallery";

export default function App() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* 標題區域 */}
      <h1 className="text-2xl font-bold mb-4 text-center">
        Game Highlights Uploader
      </h1>

      {/* 右上角顯示「登入/登出」按鈕 */}
      <div className="flex justify-end mb-4">
        <AuthButton />
      </div>

      {/* 上傳表單 (只有管理員登入時才顯示；其他人會看到提示文字) */}
      <UploadForm />

      {/* 影片列表 (未登入／非管理員只能看，管理員可以看見 Edit/Delete) */}
      <VideoGallery />
    </div>
  );
}
