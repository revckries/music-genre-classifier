# 🎵 Music Genre Classifier

A deep learning web application that classifies music genres from audio recordings using a **CNN-BiLSTM** model trained on the **GTZAN Music Genre Dataset**.

- **Live Demo**: https://music-genrify.vercel.app/  
- **Backend API**: https://revckries-music-backend.hf.space

---

## 📌 Overview

Music Genre Classification is a classic problem in **Music Information Retrieval (MIR)**.
This project explores the combination of **Convolutional Neural Networks (CNN)** and
**Bidirectional LSTM (BiLSTM)** to capture both **spectral** and **temporal** patterns in music signals.

The application allows users to:
- 🎙️ Record music directly from the browser
- 🎵 Upload audio files for classification
- 🤖 Classify music into **10 genres** using deep learning
- 📊 View prediction confidence and **Top-3 predictions**
- 📈 Track classification history

### 🎶 Supported Genres
Blues, Classical, Country, Disco, Hip-Hop, Jazz, Metal, Pop, Reggae, Rock

---

## 🧠 Model Information

- **Architecture**: CNN-BiLSTM  
- **Optimizer**: AdamW (with Adam comparison during training)  
- **Dataset**: [GTZAN Music Genre Dataset](https://www.kaggle.com/datasets/andradaolteanu/gtzan-dataset-music-genre-classification)
- **Input Features**: Mel-Spectrogram  
- **Output**: 10 genre classes with confidence scores  

### Why CNN-BiLSTM?
- **CNN** extracts local time-frequency patterns from mel-spectrograms  
- **BiLSTM** captures long-term temporal dependencies in music  
- The combination improves genre classification performance compared to CNN-only models

---

## 🚀 Deployment Guide

### 🔴 Backend Deployment (Hugging Face Spaces)

#### Prerequisites
- Hugging Face account
- Trained model file: `gtzan_model.keras`

#### Steps

1. **Create a New Space**
   - Go to https://huggingface.co/spaces
   - Click **Create new Space**
   - Choose **Docker** as the SDK
   - Name your space (e.g., `music-backend`)

2. **Project Structure**
```

backend/
├── app.py
├── Dockerfile
├── requirements.txt
└── models/
└── gtzan_model.keras

````

3. **Important Notes**
- Hugging Face Spaces requires port **7860** (already configured)
- Model file must be located at `backend/models/gtzan_model.keras`
- The Space will auto-build and deploy

4. **API URL**
- Base URL: https://revckries-music-backend.hf.space
- Health check: https://revckries-music-backend.hf.space/health

#### Updating the Model
```bash
# Option 1: Upload via Hugging Face UI
# Space → Files → backend/models/ → upload new gtzan_model.keras

# Option 2: Git-based update
git clone https://huggingface.co/spaces/revckries/music-backend
cd music-backend
cp /path/to/new/gtzan_model.keras backend/models/
git add backend/models/gtzan_model.keras
git commit -m "Update model"
git push
````

---

### 🔵 Frontend Deployment (Vercel)

#### Prerequisites

* Vercel account
* GitHub repository

#### Steps

1. **Push Code to GitHub**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**

   * Go to [https://vercel.com](https://vercel.com)
   * Click **New Project**
   * Import repository: `revckries/music-genre-classifier`
   * Configuration:

     * **Framework Preset**: Next.js
     * **Root Directory**: `frontend`
     * **Build Command**: `npm run build`
     * **Output Directory**: `.next`

3. **Environment Variables**
   In Vercel Dashboard → Settings → Environment Variables:

   ```env
   NEXT_PUBLIC_API_URL=https://revckries-music-backend.hf.space
   ```

4. **Deploy**

   * Click **Deploy**
   * Frontend auto-deploys on every push to `main`

---

## 💻 Local Development

### Backend (Flask)

```bash
cd backend
pip install -r requirements.txt
python app.py
```

Backend runs at: [http://localhost:5000](http://localhost:5000)

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: [http://localhost:3000](http://localhost:3000)

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## 🔌 API Endpoints

| Method | Endpoint   | Description              |
| ------ | ---------- | ------------------------ |
| GET    | `/`        | API status and routes    |
| GET    | `/health`  | Health check             |
| POST   | `/predict` | Classify audio file      |
| GET    | `/genres`  | Get supported genre list |

### Example Request

```bash
curl -X POST https://revckries-music-backend.hf.space/predict \
  -F "file=@audio.mp3"
```

### Example Response

```json
{
  "genre": "jazz",
  "confidence": 0.89,
  "top_3": [
    {"genre": "jazz", "confidence": 0.89},
    {"genre": "blues", "confidence": 0.06},
    {"genre": "classical", "confidence": 0.03}
  ]
}
```

---

## 🎓 Model Training

Training notebook:

```
training/notebooks/training.ipynb
```

### Training Features

* Exploratory Data Analysis (EDA)
* Adam vs AdamW optimizer comparison
* Data augmentation
* Model evaluation and metrics

### Retraining Steps

```bash
# 1. Open training.ipynb
# 2. Run all cells
# 3. Model saved as gtzan_model.keras
# 4. Upload model to Hugging Face Space
```

---

## 🛠️ Tech Stack

| Category    | Tools & Frameworks                              |
|------------|------------------------------------------------|
| Backend    | Flask, TensorFlow/Keras, Librosa, NumPy        |
| Frontend   | Next.js, React, Tailwind CSS, Axios            |
| Deployment | Hugging Face Spaces, Vercel                    |

---

## 📝 Notes

* Model file (`gtzan_model.keras`) is not pushed to GitHub due to size limits
* Model is stored and served via Hugging Face Spaces
* Frontend auto-deploys on every GitHub push
* Backend model updates require re-upload to Hugging Face

---

## 🐛 Troubleshooting

### Backend

* **Model not found**: Ensure `gtzan_model.keras` exists in `backend/models/`
* **Port error**: Hugging Face requires port 7860
* **Memory issue**: Free tier has RAM limitations

### Frontend

* **CORS error**: Check `NEXT_PUBLIC_API_URL`
* **API not responding**: Ensure Hugging Face Space is running
* **Build failed**: Verify `frontend` is set as root directory in Vercel

---

## 👥 Contributors

* Christine Kosasih
* Gisella Jayata
* Vellyn Angeline

---

## 🔗 Links

* Live Demo: [https://music-genrify.vercel.app/](https://music-genrify.vercel.app/)
* Backend API: [https://revckries-music-backend.hf.space](https://revckries-music-backend.hf.space)
* GitHub Repository: [https://github.com/revckries/music-genre-classifier](https://github.com/revckries/music-genre-classifier)

```
