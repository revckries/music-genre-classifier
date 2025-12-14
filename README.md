# 🎵 Music Genre Classifier

A deep learning web application that classifies music genres from audio recordings using a pre-trained GTZAN model.  

This project consists of a **Flask backend API** for audio processing and inference, and a **Next.js frontend** for user interaction.

---

## 📌 Overview

This application allows users to:
- Record music directly from the browser
- Send audio data to a backend API
- Extract audio features using Librosa
- Classify music into music genres using a deep learning model
- View prediction confidence and classification history

The system is cross-platform and can run on **Windows, macOS, and Linux**.

---

## 🧠 Model Information

- **Model file**: `models/gtzan_model.keras`
- **Dataset**: GTZAN
- **Number of genres**: 10

### Supported Genres
Blues, Classical, Country, Disco, Hip-Hop, Jazz, Metal, Pop, Reggae, Rock

The model outputs:
- Predicted genre
- Confidence score
- Top 3 genre probabilities

---

## 🏗️ Project Structure

```

music-genre-classifier/
├── backend/
│   ├── uploads/
│   ├── app.py
│   └── requirements.txt
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── styles/
│   ├── .gitignore
│   ├── eslint.config.mjs
│   ├── jsconfig.json
│   ├── next.config.mjs
│   ├── package-lock.json
│   └── package.json
├── models/
│   └── gtzan_model.keras
├── training/
│   ├── data/
│   └── notebooks/
├── .gitignore
├── package-lock.json
├── QUICK_START.md
└── README.md

````

---

## 🚀 Quick Start (Summary)

### Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
````

Backend runs at:
👉 [http://localhost:5000](http://localhost:5000)

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:
👉 [http://localhost:3000](http://localhost:3000)

📌 For OS-specific instructions (Windows / macOS / Linux), see:
➡️ **[QUICK_START.md](./QUICK_START.md)**

---

## 🔧 Environment Configuration

Create a `.env.local` file inside the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Restart the frontend after updating this file.

---

## 🔌 API Endpoints

| Method | Endpoint   | Description             |
| ------ | ---------- | ----------------------- |
| GET    | `/health`  | Check backend status    |
| POST   | `/predict` | Classify uploaded audio |
| GET    | `/genres`  | Get supported genres    |

---

## 🎤 Frontend Features

* Browser-based audio recording
* Real-time processing progress
* Genre prediction with confidence visualization
* Top 3 genre predictions
* Classification history using localStorage
* Export results to JSON or CSV

---

## ❌ Troubleshooting

### Backend fails to start

* Ensure Python is installed
* Verify TensorFlow installation:

  ```bash
  python -c "import tensorflow; print(tensorflow.__version__)"
  ```
* Ensure `gtzan_model.keras` exists in the `models/` folder

### Frontend cannot connect to backend

* Ensure backend runs on port 5000
* Check `.env.local` configuration
* Restart frontend after changes
