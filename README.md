# Music Genre Classifier

A deep learning application that classifies music genres using the GTZAN dataset and model.

## Quick Start

### Backend Setup (Terminal 1)
```bash
cd backend
pip install -r requirements.txt
python app.py
```
Runs on: `http://localhost:5000`

### Frontend Setup (Terminal 2)
```bash
cd -music-genre-classifier/frontend
npm install  # Already done
npm run dev
```
Runs on: `http://localhost:3000`

## What It Does

1. **Record Audio** - Capture music from your microphone
2. **Process** - Backend extracts mel-spectrogram features
3. **Classify** - GTZAN model predicts genre + confidence
4. **History** - View past classifications and export data

## Supported Genres
Blues, Classical, Country, Disco, Hip-Hop, Jazz, Metal, Pop, Reggae, Rock

## API Endpoints

- `GET /health` - Check backend status
- `POST /predict` - Send audio file for classification
- `GET /genres` - Get list of genres

## Key Files

- `backend/app.py` - Flask API server
- `gtzan_model.keras` - Pre-trained model
- `-music-genre-classifier/frontend/src/components/classifier/ProcessingView.js` - Handles audio submission and results
- `-music-genre-classifier/frontend/src/components/classifier/HistoryView.js` - Shows classification history

## Frontend Features

- Real-time audio recording
- Progress tracking (10-100%)
- Results display with confidence scores
- Classification history with localStorage
- Export to JSON/CSV

## Environment Variables

Frontend: Create `.env.local` in `frontend/`
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Troubleshooting

**Backend won't load model?**
- Ensure `gtzan_model.keras` is in project root
- Check TensorFlow installation: `python -c "import tensorflow; print(tensorflow.__version__)"`

**Frontend can't connect to backend?**
- Verify backend is running on port 5000
- Check `.env.local` API_URL is correct
- Ensure Flask-CORS is installed

**Audio processing fails?**
- Try with a different audio file
- Check browser console for errors
- Verify audio is WAV, MP3, or WebM format
