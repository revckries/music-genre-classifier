# 🎵 Music Genre Classifier - Quick Start

## ✅ What's Been Integrated

✓ **Backend** (Flask API) - `backend/app.py`
  - Loads GTZAN model
  - `/predict` endpoint for audio classification
  - Feature extraction with Librosa
  - Returns genre + confidence + top 3

✓ **Frontend** (Next.js React) - `-music-genre-classifier/frontend/`
  - Audio recording UI
  - Sends audio to backend
  - Displays results with confidence bars
  - History with localStorage
  - Export to JSON/CSV

✓ **Model** - `gtzan_model.keras` (8.9MB)
  - Pre-trained GTZAN classifier
  - 10 genres supported

## 🚀 Start Application

### Option 1: Using Scripts (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
bash start.sh
```

**Terminal 2 - Frontend:**
```bash
cd -music-genre-classifier/frontend
bash start.sh
```

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
pip install -r requirements.txt
python app.py
```

**Terminal 2 - Frontend:**
```bash
cd -music-genre-classifier/frontend
npm run dev
```

## 📍 Access

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## ⚡ First Run

1. Backend will auto-install dependencies if needed
2. Frontend checks for `.env.local` configuration
3. Model loads automatically when backend starts
4. Frontend connects to backend API

## 🎤 How to Use

1. Click "Get Started" on landing page
2. Click "Record Now"
3. Record 5-30 seconds of music
4. Stop recording
5. Wait for classification (~3-5 seconds)
6. View results with confidence
7. Check history anytime

## 📊 Supported Genres

Blues, Classical, Country, Disco, Hip-Hop, Jazz, Metal, Pop, Reggae, Rock

## 🔧 Environment

Frontend loads from `NEXT_PUBLIC_API_URL` env variable (defaults to `http://localhost:5000`)

## ❌ Troubleshooting

**Backend won't start?**
- Check: `pip list | grep -i tensorflow`
- If missing: `pip install tensorflow librosa`

**Frontend won't connect?**
- Verify backend running on port 5000
- Check `.env.local` has correct API_URL

**Audio processing fails?**
- Try different audio file
- Check browser console (F12)

## 📂 Key Files

```
Final_Project/
├── gtzan_model.keras              # Model (8.9MB)
├── backend/
│   ├── app.py                    # Flask API
│   ├── requirements.txt          # Dependencies
│   └── start.sh                  # Auto-starter
├── -music-genre-classifier/
│   ├── frontend/
│   │   ├── src/app/page.js      # Main component
│   │   ├── src/components/classifier/
│   │   │   ├── ProcessingView.js  # API integration
│   │   │   ├── HistoryView.js     # History & export
│   │   │   └── HomeView.js        # Home screen
│   │   ├── .env.local            # API config
│   │   └── start.sh              # Auto-starter
│   └── package.json
└── README.md
```

---

**Ready to classify music! 🎵**
