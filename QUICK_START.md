# 🚀 Quick Start — Music Genre Classifier

This guide provides clear, step-by-step instructions to run the project locally on **Windows, macOS, or Linux**.

---

## 🪟 Windows (PowerShell)

### Backend (Terminal 1)
```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate
pip install -r requirements.txt
python app.py
````

Backend runs at:
👉 [http://localhost:5000](http://localhost:5000)

---

### Frontend (Terminal 2)

```powershell
cd -music-genre-classifier/frontend
npm install
npm run dev
```

Frontend runs at:
👉 [http://localhost:3000](http://localhost:3000)

---

## 🍎 macOS / 🐧 Linux

### Backend (Terminal 1)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

Backend runs at:
👉 [http://localhost:5000](http://localhost:5000)

---

### Frontend (Terminal 2)

```bash
cd -music-genre-classifier/frontend
npm install
npm run dev
```

Frontend runs at:
👉 [http://localhost:3000](http://localhost:3000)

---

## 🔧 Environment Setup

Create a `.env.local` file inside the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Restart the frontend after creating or editing this file.

---

## 🎤 How to Use the Application

1. Open [http://localhost:3000](http://localhost:3000) in your browser
2. Click **Get Started**
3. Click **Record Now**
4. Record 5–30 seconds of music
5. Stop the recording
6. Wait ~3–5 seconds for classification
7. View the predicted genre and confidence score

---

## ❗ Common Issues & Fixes

### PowerShell cannot activate virtual environment

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

---

### Missing backend dependencies

```bash
pip install tensorflow librosa
```

---

### Frontend cannot connect to backend

* Ensure backend is running on port 5000
* Verify `.env.local` API URL
* Restart frontend after configuration changes

---

## ✅ You're Ready!

* **Frontend**: [http://localhost:3000](http://localhost:3000)
* **Backend API**: [http://localhost:5000](http://localhost:5000)

🎵 Happy music classification!

```