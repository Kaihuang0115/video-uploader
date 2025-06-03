<<<<<<< HEAD
// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
=======
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
>>>>>>> 288b56b (加入 Auth 判斷，只有管理員可上傳/編輯/刪除影片)
  theme: {
    extend: {},
  },
  plugins: [],
};
