# 😊 EmotiSense — Live Emotion Detection

A professional, full-stack React website that detects 7 facial emotions in real-time using your webcam — entirely in the browser, no server needed.

## 🚀 Tech Stack

- **React 18** + **Vite** (fast dev server & build)
- **Tailwind CSS** (styling)
- **face-api.js** + **TensorFlow.js** (on-device AI)
- **React Router** (multi-page SPA)
- **Vercel** (deployment)

---

## 📁 Project Structure

```
emotisense/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Landing.jsx     ← Professional landing page
│   │   ├── Demo.jsx        ← Live emotion detection
│   │   └── About.jsx       ← About & tech stack
│   ├── hooks/
│   │   └── useEmotionDetection.js  ← Core AI hook
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
├── vercel.json
└── package.json
```

---

## ⚙️ Local Setup (VS Code)

### Step 1 — Clone / open folder

```bash
# Agar GitHub se clone karna ho:
git clone https://github.com/YOUR_USERNAME/emotisense.git
cd emotisense

# Ya seedha VS Code mein folder open karo
code emotisense
```

### Step 2 — Dependencies install karo

```bash
npm install
```

### Step 3 — Dev server start karo

```bash
npm run dev
```

Browser mein `http://localhost:5173` kholo. 🎉

---

## 🌐 Deploy to Vercel (Free)

### Option A — Vercel CLI (recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Production deploy
vercel --prod
```

### Option B — GitHub + Vercel Dashboard

1. GitHub par new repository banao
2. Code push karo:
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/emotisense.git
   git push -u origin main
   ```
3. [vercel.com](https://vercel.com) par jao → **New Project**
4. GitHub repo select karo → **Deploy**
5. Done! Live URL mil jayegi ✅

---

## 🎯 Features

- ✅ Real-time emotion detection (30+ FPS)
- ✅ 7 emotions: Happy, Sad, Angry, Fearful, Disgusted, Surprised, Neutral
- ✅ Confidence score bars for all emotions
- ✅ Multi-face support
- ✅ Session stats (frames, FPS, dominant emotion)
- ✅ Privacy-first: no data leaves your device
- ✅ Responsive design (mobile + desktop)
- ✅ Dark mode UI
- ✅ Multi-page: Landing, Demo, About

---

## 🔒 Privacy

All AI inference runs locally in WebAssembly. No video data is ever sent to any server.

---

## 📄 License

MIT — free to use and modify.
