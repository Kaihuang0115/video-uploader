import React, { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { ref as storageRef, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase";

export default function VideoGallery() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "videos"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, snapshot => {
      setVideos(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));  
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async video => {
    if (!window.confirm(`確定要刪除「${video.name}」嗎？`)) return;
    try {
      await deleteDoc(doc(db, "videos", video.id));
      const fileRef = storageRef(storage, `highlights/${video.name}`);
      await deleteObject(fileRef);
    } catch (err) {
      console.error("刪除失敗：", err);
      alert("刪除失敗，請稍後再試");
    }
  };

  return (
    <div className="mt-6 grid grid-cols-2 gap-4 px-4">
      {videos.length === 0 && <p className="col-span-2 text-center">No highlights yet.</p>}
      {videos.map(video => (
        <div key={video.id} className="p-2 border rounded flex flex-col">
          <p className="font-semibold truncate text-center mb-2">{video.name}</p>
          <div className="w-full h-48 overflow-hidden mb-2">
            <video
              src={video.url}
              controls
              preload="metadata"
              className="w-full h-full object-cover rounded"
            />
          </div>
          <button
            type="button"
            onClick={() => handleDelete(video)}
            className="mt-auto py-1 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
