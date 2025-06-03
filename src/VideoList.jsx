import React from "react";
import VideoPlayer from "./VideoPlayer";

export default function VideoList({ videos }) {
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
      {videos.map((video) => (
        <div key={video.url} className="w-[300px]">
          <VideoPlayer video={video} />
        </div>
      ))}
    </div>
  );
}
