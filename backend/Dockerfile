# Use an official Python runtime with some useful build tools
FROM python:3.9-slim

# Install system dependencies required for audio processing (librosa, pydub)
# ffmpeg: for pydub to handle various audio formats
# libsndfile1: for soundfile/librosa
RUN apt-get update && apt-get install -y \
    ffmpeg \
    libsndfile1 \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend application code
COPY . .

# Hugging Face Spaces expects the app to run on port 7860 by default
EXPOSE 7860

# Define the command to run the application using Gunicorn on port 7860
CMD ["gunicorn", "--bind", "0.0.0.0:7860", "--timeout", "120", "app:app"]
