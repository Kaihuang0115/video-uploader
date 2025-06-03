// src/components/VideoGallery.jsx
import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";            // 新增
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref as storageRef, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase";

export default function VideoGallery() {
  const [videos, setVideos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState("");
  const [currentUser, setCurrentUser] = useState(null); // 用來存目前登入者

  useEffect(() => {
    // 監聽 Firebase Auth 狀態
    const auth = getAuth();
    const unsubAuth = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });

    // 監聽 Firestore videos collection
    const q = query(collection(db, "videos"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, snapshot => {
      setVideos(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => {
      unsubscribe();
      unsubAuth();
    };
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

  const handleEdit = video => {
    setEditingId(video.id);
    setNewName(video.name);
  };

  const handleSave = async video => {
    if (newName.trim() === "") {
      alert("名稱不能為空");
      return;
    }
    try {
      const docRef = doc(db, "videos", video.id);
      await updateDoc(docRef, { name: newName });
      setEditingId(null);
    } catch (err) {
      console.error("更新失敗：", err);
      alert("無法更新名稱");
    }
  };

  return (
    <div className="mt-6 grid grid-cols-2 gap-4 px-4">
      {videos.length === 0 && (
        <p className="col-span-2 text-center">No highlights yet.</p>
      )}
      {videos.map(video => (
        <div key={video.id} className="p-2 border rounded flex flex-col">
          {editingId === video.id ? (
            <>
              <input
                type="text"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                className="mb-2 border px-2 py-1 rounded"
              />
              <div className="flex justify-between mb-2">
                <button
                  onClick={() => handleSave(video)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  disabled={
                    !currentUser ||
                    currentUser.uid !== "QGp2BlVY7FfA7HRytVgLsACwKR13"
                  }
                >
                  儲存
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-300 px-2 py-1 rounded"
                >
                  取消
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="font-semibold truncate text-center mb-2">
                {video.name}
              </p>
              {currentUser &&
                currentUser.uid === "QGp2BlVY7FfA7HRytVgLsACwKR13" && (
                  <button
                    onClick={() => handleEdit(video)}
                    className="text-blue-500 text-sm mb-2"
                  >
                    ✏️ 編輯名稱
                  </button>
                )}
            </>
          )}

          <div className="w-full h-48 overflow-hidden mb-2">
            <video
              src={video.url}
              controls
              preload="metadata"
              className="w-full h-full object-cover rounded"
            />
          </div>

          {/* 只有管理員才會看到刪除按鈕 */}
          {currentUser && currentUser.uid === "QGp2BlVY7FfA7HRytVgLsACwKR13" && (
            <button
              type="button"
              onClick={() => handleDelete(video)}
              className="mt-auto py-1 bg-red-500 text-white rounded"
            >
              刪除
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
