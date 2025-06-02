import React from "react";
import UploadForm from "./components/UploadForm";
import VideoGallery from "./components/VideoGallery";

export default function App() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Game Highlights Uploader</h1>
      <UploadForm />
      <VideoGallery />
    </div>
  );
}
