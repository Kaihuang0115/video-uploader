import React from "react";

export default function VideoPlayer({ video, onClose }) {
  if (!video) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-2xl p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ❌
        </button>
        <h2 className="text-lg font-semibold mb-2">{video.name}</h2>
        <video controls className="w-full max-h-[80vh]">
          <source src={video.url} type="video/mp4" />
          您的瀏覽器不支援影片播放。
        </video>
      </div>
    </div>
  );
}