# 🎵 Music Genre Classifier

A deep learning web application that classifies music genres from audio recordings using a CNN-BiLSTM model trained on the GTZAN dataset.

**Live Demo**: [https://music-genrify.vercel.app/]
**Backend API**: [https://revckries-music-backend.hf.space]
---

## 📌 Overview

This application allows users to:
- 🎙️ Record music directly from the browser
- 🎵 Upload audio files for classification
- 🤖 Classify music into 10 different genres using deep learning
- 📊 View prediction confidence and top 3 predictions
- 📈 Track classification history

### Supported Genres
Blues, Classical, Country, Disco, Hip-Hop, Jazz, Metal, Pop, Reggae, Rock

---

## 🧠 Model Information

- **Architecture**: CNN-BiLSTM
- **Optimizer**: AdamW (with Adam comparison)
- **Dataset**: GTZAN Music Genre Dataset
- **Input**: Mel-spectrogram features
- **Output**: 10 genre classes with confidence scores

---

## 🚀 Deployment Guide

### 🔴 Backend Deployment (Hugging Face Spaces)

#### Prerequisites
- Hugging Face account
- Trained model file (`gtzan_model.keras`)

#### Steps:

1. **Create a New Space**
   - Go to [Hugging Face Spaces](https://huggingface.co/spaces)
   - Click "Create new Space"
   - Choose **Docker** as the SDK
   - Name your space (e.g., `music-backend`)

2. **Upload Files**
   ```
   backend/
   ├── app.py
   ├── Dockerfile
   ├── requirements.txt
   └── models/
       └── gtzan_model.keras
   ```

3. **Important Notes**
   - The `Dockerfile` is already configured for port **7860** (Hugging Face requirement)
   - Model file should be in `backend/models/gtzan_model.keras`
   - Space will auto-build and deploy

4. **Get Your API URL**
   - Your API will be available at: `https://revckries-music-backend.hf.space`
   - Test it: `https://revckries-music-backend.hf.space/health`

#### Update Model Later:
```bash
# Option 1: Via Hugging Face UI
# - Go to your Space → Files → backend/models/
# - Upload new gtzan_model.keras
# - Space will auto-restart

# Option 2: Via Git
git clone https://huggingface.co/spaces/revckries/music-backend
cd music-backend
cp /path/to/new/gtzan_model.keras backend/models/
git add backend/models/gtzan_model.keras
git commit -m "Update model"
git push
```

---

### 🔵 Frontend Deployment (Vercel)

#### Prerequisites
- Vercel account
- GitHub repository

#### Steps:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository (`revckries/music-genre-classifier`)
   - Configure:
     - **Framework Preset**: Next.js
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `.next`

3. **Set Environment Variables**
   In Vercel dashboard → Settings → Environment Variables:
   ```
   NEXT_PUBLIC_API_URL=https://revckries-music-backend.hf.space
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will auto-deploy on every push to `main`

#### Update Backend URL:
```bash
# If you change backend URL later:
# 1. Update in Vercel dashboard → Settings → Environment Variables
# 2. Redeploy (automatic or manual trigger)
```

---

## 💻 Local Development

### Backend (Flask)
```bash
cd backend
pip install -r requirements.txt
python app.py
```
Backend runs at: http://localhost:5000

### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at: http://localhost:3000

**Local Environment Setup:**
Create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## 🔌 API Endpoints

| Method | Endpoint   | Description                    |
|--------|------------|--------------------------------|
| GET    | `/`        | API status and available routes|
| GET    | `/health`  | Health check                   |
| POST   | `/predict` | Classify audio file            |
| GET    | `/genres`  | Get list of supported genres   |

### Example Request:
You can test the API directly from your terminal using `curl` (replace `audio.mp3` with your file):

```bash
curl -X POST https://revckries-music-backend.hf.space/predict \
  -F "file=@audio.mp3"
```

### Example Response:
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

## 🎓 Training the Model

The training notebook is located in `training/notebooks/training.ipynb`.

### Features:
- ✅ Exploratory Data Analysis (EDA)
- ✅ Adam vs AdamW optimizer comparison
- ✅ Data augmentation
- ✅ Model evaluation and metrics

### To Retrain:
```bash
# 1. Open training.ipynb in Jupyter
# 2. Run all cells
# 3. Model will be saved as gtzan_model.keras
# 4. Upload to Hugging Face Space (see Backend Deployment)
```

---

## 🛠️ Tech Stack

**Backend:**
- Flask
- TensorFlow/Keras
- Librosa
- NumPy

**Frontend:**
- Next.js
- React
- TailwindCSS
- Axios

**Deployment:**
- Hugging Face Spaces (Backend)
- Vercel (Frontend)

---

## 📝 Notes

- Model file (`gtzan_model.keras`) is **not** pushed to GitHub (too large)
- Model is only stored in Hugging Face Spaces
- Frontend auto-deploys on GitHub push
- Backend requires manual model upload to Hugging Face

---

## 🐛 Troubleshooting

### Backend Issues:
- **Model not found**: Ensure `gtzan_model.keras` is in `backend/models/`
- **Port error**: Hugging Face requires port 7860 (already configured)
- **Memory error**: Hugging Face free tier has memory limits

### Frontend Issues:
- **CORS error**: Check `NEXT_PUBLIC_API_URL` in Vercel environment variables
- **API not responding**: Verify Hugging Face Space is running
- **Build failed**: Check `frontend` is set as root directory in Vercel

---

## 👥 Contributors

1. Christine Kosasih
2. Gisella Jayata
3. Vellyn Angeline

---

## 🔗 Links

- [Live Demo](https://music-genrify.vercel.app/)
- [Backend API](https://revckries-music-backend.hf.space)
- [GitHub Repository](https://github.com/revckries/music-genre-classifier)