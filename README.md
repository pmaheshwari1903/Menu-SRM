<div align="center">
  <h1>🍽️ SRM Mess Menu Tracker</h1>
  <p><strong>Never wonder "What's for dinner?" again.</strong></p>
</div>

<br />

## 🚨 The Problem
Like many of my batchmates, I got tired of the daily struggle: walking all the way to the mess hall, searching through the physical paper menu pinned to the notice board, and manually cross-checking the day and time just to figure out what was being served. 

It was tedious, confusing, and honestly, a pain when you just want to know if today is chicken curry day or if you're settling for something else!

## 💡 The Solution
I built this web application to digitize the manual work for everyone. **SRM Mess Menu** is a smart, time-aware web app that automatically detects the current day and time to show you exactly what is being served *right now*.

No more squinting at a paper chart. Just open the link, and let the app tell you what's cooking.

---

## ✨ Features
- **⏰ Smart Time Detection**: Automatically highlights the current active meal slot (Breakfast, Lunch, Snacks, or Dinner) based on the live clock.
- **⏳ Real-Time Countdown**: Shows exactly how much time is left before the current meal winds up (e.g., "Ends in 30 mins").
- **📅 Full Weekly Schedule**: View the entire week's menu seamlessly, from Monday to Sunday.
- **🎨 Premium Dark UI**: A beautiful, glassmorphism-inspired dark mode that looks stunning on mobile devices.
- **📱 PWA Ready (Fast)**: Built as a lightning-fast React Single Page Application.
- **👁️ Live Visitor Counter**: Track how many students are checking the menu in real-time (powered by Vercel KV).

---

## 🛠️ Built With
- **React.js (Vite)**
- **Tailwind-inspired Vanilla CSS**
- **Vercel Serverless Functions**
- **Vercel KV (Redis)**

---

## 🚀 How to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/pmaheshwari1903/Menu-SRM.git
   cd Menu-SRM
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` to view it in your browser.

---

<div align="center">
  <i>Developed with ❤️ by <b>Parth Maheshwari</b> to make hostel life just a little bit easier.</i>
</div>
