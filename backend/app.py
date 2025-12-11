import numpy as np
import librosa
from tensorflow import keras
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import io
import tempfile
from pydub import AudioSegment
from pydub.utils import which as pydub_which

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'wav', 'mp3', 'ogg', 'flac', 'm4a', 'webm'}
MAX_FILE_SIZE = 50 * 1024 * 1024  # 50MB

GENRES = ['blues', 'classical', 'country', 'disco', 'hiphop',
          'jazz', 'metal', 'pop', 'reggae', 'rock']

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load model
try:
    # Get the path to the model file (it's in the project root/models/ directory)
    model_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'models', 'gtzan_model.keras')
    model = keras.models.load_model(model_path)
    print(f"✓ Model loaded successfully from: {model_path}")
except Exception as e:
    print(f"✗ Error loading model: {e}")
    model = None


def convert_audio_to_wav(audio_data, original_format=None):
    """Convert audio to WAV format using pydub.

    original_format: optional format hint like 'webm', 'mp3', 'ogg'. If None, pydub will try to auto-detect.
    Returns raw WAV bytes or None on failure.
    """
    try:
        # First try to load from bytes with optional format hint
        if original_format:
            audio = AudioSegment.from_file(io.BytesIO(audio_data), format=original_format)
        else:
            audio = AudioSegment.from_file(io.BytesIO(audio_data))

        wav_buffer = io.BytesIO()
        audio.export(wav_buffer, format='wav')
        wav_buffer.seek(0)
        return wav_buffer.getvalue()
    except Exception as e:
        print(f"Pydub in-memory conversion failed: {e}")
        # Check if ffmpeg/avlib is available which pydub relies on
        ffmpeg_path = pydub_which('ffmpeg') or pydub_which('ffmpeg.exe')
        if not ffmpeg_path:
            print("ffmpeg not found in PATH. Pydub requires ffmpeg to convert some formats (webm/ogg/mp3).")
            print("On macOS: `brew install ffmpeg`\nOn Linux (apt): `sudo apt install ffmpeg`\nOr ensure ffmpeg is on the PATH.")

    # Try writing to a temporary file and let pydub/ffmpeg infer format
    try:
        with tempfile.NamedTemporaryFile(delete=False) as tmpf:
            tmpf.write(audio_data)
            tmp_name = tmpf.name

        try:
            audio = AudioSegment.from_file(tmp_name)
            wav_buffer = io.BytesIO()
            audio.export(wav_buffer, format='wav')
            wav_buffer.seek(0)
            return wav_buffer.getvalue()
        except Exception as e2:
            print(f"Pydub file-based conversion failed: {e2}")
            return None
    finally:
        try:
            os.unlink(tmp_name)
        except Exception:
            pass


def extract_melspectrogram(audio_data, sample_rate=22050, duration=30.0, format_hint=None):
    """Extract mel-spectrogram from audio data"""
    try:
        # First try direct load
        try:
            # librosa.load can accept a file-like object, but some formats require conversion
            audio, sr = librosa.load(io.BytesIO(audio_data), sr=sample_rate, duration=duration)
        except Exception as e:
            print(f"Direct load failed: {e}, trying conversion...")
            # Try converting using pydub with provided hint
            wav_data = None
            if format_hint:
                try:
                    wav_data = convert_audio_to_wav(audio_data, original_format=format_hint)
                except Exception as _:
                    wav_data = None

            # If no wav_data yet, try auto-detect conversion
            if wav_data is None:
                wav_data = convert_audio_to_wav(audio_data, original_format=None)

            # If still no wav_data and ffmpeg missing, raise explicit error
            if wav_data is None:
                ffmpeg_path = pydub_which('ffmpeg') or pydub_which('ffmpeg.exe')
                if not ffmpeg_path:
                    raise Exception("Could not decode audio: ffmpeg not found on server. Install ffmpeg (e.g. `brew install ffmpeg` or `sudo apt install ffmpeg`) and restart the backend.")

            if wav_data:
                try:
                    audio, sr = librosa.load(io.BytesIO(wav_data), sr=sample_rate, duration=duration)
                except Exception as e2:
                    print(f"Librosa failed to load converted WAV in-memory: {e2}, trying disk fallback...")
                    # As a last resort, write WAV to temp file and load by filename
                    with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as tf:
                        tf.write(wav_data)
                        tf_name = tf.name
                    try:
                        audio, sr = librosa.load(tf_name, sr=sample_rate, duration=duration)
                    finally:
                        try:
                            os.unlink(tf_name)
                        except Exception:
                            pass
            else:
                raise Exception("Could not decode audio. Try a different file.")
        
        n_samples = int(sample_rate * duration)
        
        if len(audio) < n_samples:
            audio = np.pad(audio, (0, n_samples - len(audio)))
        else:
            audio = audio[:n_samples]
        
        mel_spec = librosa.feature.melspectrogram(
            y=audio, sr=sample_rate, n_mels=128, n_fft=2048, hop_length=512
        )
        
        mel_spec_db = librosa.power_to_db(mel_spec, ref=np.max)
        mel_spec_db = (mel_spec_db - mel_spec_db.mean()) / mel_spec_db.std()
        
        if mel_spec_db.shape[1] < 1292:
            pad_width = 1292 - mel_spec_db.shape[1]
            mel_spec_db = np.pad(mel_spec_db, ((0, 0), (0, pad_width)))
        else:
            mel_spec_db = mel_spec_db[:, :1292]
        
        return mel_spec_db[..., np.newaxis]
    except Exception as e:
        raise Exception(f"Error extracting mel-spectrogram: {str(e)}")


def predict_genre(audio_data, format_hint=None):
    """Predict genre for audio data"""
    if model is None:
        raise Exception("Model not loaded")
    
    try:
        # Pass format hint to extraction when available
        features = extract_melspectrogram(audio_data, format_hint=format_hint)
        features = features[np.newaxis, ...]
        predictions = model.predict(features, verbose=0)[0]
        
        predicted_idx = np.argmax(predictions)
        confidence = predictions[predicted_idx]
        top_3_idx = np.argsort(predictions)[-3:][::-1]
        
        return {
            'genre': GENRES[predicted_idx],
            'confidence': float(confidence),
            'top_3': [(GENRES[i], float(predictions[i])) for i in top_3_idx],
            'all_probabilities': {genre: float(prob) for genre, prob in zip(GENRES, predictions)}
        }
    except Exception as e:
        raise Exception(f"Error predicting genre: {str(e)}")


@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'model_loaded': model is not None, 'genres': GENRES})


@app.route('/predict', methods=['POST'])
def predict():
    try:
        if 'audio' not in request.files:
            return jsonify({'error': 'No audio file provided'}), 400
        
        audio_file = request.files['audio']
        if audio_file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        print(f"Received audio file: {audio_file.filename}")
        
        audio_data = audio_file.read()
        print(f"Audio data size: {len(audio_data)} bytes")
        # Determine a format hint from filename or content_type
        format_hint = None
        try:
            content_type = audio_file.content_type or ''
            if 'webm' in content_type:
                format_hint = 'webm'
            elif 'ogg' in content_type:
                format_hint = 'ogg'
            elif 'mp3' in content_type:
                format_hint = 'mp3'
            elif 'mpeg' in content_type:
                format_hint = 'mp3'
            elif 'wav' in content_type:
                format_hint = 'wav'
        except Exception:
            format_hint = None

        # Also try to infer from filename extension
        if not format_hint and '.' in audio_file.filename:
            ext = audio_file.filename.rsplit('.', 1)[1].lower()
            if ext in {'webm', 'ogg', 'mp3', 'wav', 'm4a', 'flac'}:
                format_hint = ext

        result = predict_genre(audio_data, format_hint=format_hint)
        print(f"✓ Prediction: {result['genre']} ({result['confidence']:.2%})")
        
        return jsonify(result), 200
        
    except Exception as e:
        print(f"✗ Error: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/genres', methods=['GET'])
def get_genres():
    return jsonify({'genres': GENRES}), 200


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
