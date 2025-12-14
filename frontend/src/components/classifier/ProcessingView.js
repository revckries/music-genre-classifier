"use client";

import React, { useEffect, useState } from 'react';
import styles from '../../styles/classifier/ProcessingView.module.css';
import { StopCircle, AlertCircle, CheckCircle } from 'lucide-react';

const ProcessingView = ({ onCancel, audioBlob, onProcessingComplete }) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [sentFallback, setSentFallback] = useState(false);

    // API endpoint - make sure backend is running on localhost:5000
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    useEffect(() => {
        if (audioBlob && !isProcessing) {
            // detect if file is non-wav fallback
            try {
                const isFallback = audioBlob && audioBlob.type && audioBlob.type !== 'audio/wav';
                setSentFallback(!!isFallback);
            } catch (e) {
                setSentFallback(false);
            }
            sendAudioToBackend();
        }
    }, [audioBlob]);

    // Simulate progress
    useEffect(() => {
        if (isProcessing && progress < 95) {
            const timer = setTimeout(() => {
                setProgress(prev => Math.min(prev + Math.random() * 30, 95));
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isProcessing, progress]);

    const sendAudioToBackend = async () => {
        setIsProcessing(true);
        setProgress(10);
        setError(null);

        try {
            // Create FormData to send the audio file/blob
            const formData = new FormData();
            // If audioBlob is a File, it will carry a name; otherwise choose based on MIME
            const filename = (audioBlob && audioBlob.name) ? audioBlob.name : (audioBlob && audioBlob.type === 'audio/wav' ? 'recording.wav' : 'recording.webm');
            formData.append('audio', audioBlob, filename);

            console.log("Sending audio to backend...", audioBlob.size, "bytes");

            // Send to backend
            const response = await fetch(`${API_BASE_URL}/predict`, {
                method: 'POST',
                body: formData,
            });

            console.log("Response status:", response.status);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to process audio');
            }

            const data = await response.json();
            console.log("Prediction result:", data);
            
            setProgress(100);
            setResult(data);

            // Call parent handler with result
            if (onProcessingComplete) {
                onProcessingComplete(data);
            }

            setIsProcessing(false);
        } catch (err) {
            console.error('Error processing audio:', err);
            setError(err.message);
            setIsProcessing(false);
            setProgress(0);
        }
    };

    // Show result view
// Show result view
if (result && !isProcessing) {
    return (
        <div className={styles.resultContainer}>
            <div className={styles.resultHeader}>
                <CheckCircle size={32} color="#6c5ce7" />

                <h1 className={styles.resultTitle}>Classification Complete!</h1>
            </div>

            <div className={styles.resultContent}>
                {/* Left Column - Detected Genre */}
                <div className={styles.genreCard}>
                    <p className={styles.genreLabel}>Detected Genre</p>
                    <p className={styles.genreValue}>{result.genre}</p>
                    
                    <div className={styles.confidenceSection}>
                        <span className={styles.confidenceLabel}>Confidence:</span>
                        <span className={styles.confidenceValue}>{(result.confidence * 100).toFixed(1)}%</span>
                    </div>
                </div>

                {/* Right Column - Top 3 Predictions */}
                {result.top_3 && result.top_3.length > 0 && (
                    <div className={styles.predictionsSection}>
                        <h3 className={styles.predictionsTitle}>Top 3 Predictions</h3>
                        {result.top_3.map((item, idx) => (
                            <div key={idx} className={styles.predictionItem}>
                                <div className={styles.predictionLabel}>
                                    <span className={styles.predictionName}>{item[0]}</span>
                                    <span className={styles.predictionPercent}>{(item[1] * 100).toFixed(1)}%</span>
                                </div>
                                <div className={styles.predictionBar}>
                                    <div 
                                        className={styles.predictionBarFill}
                                        style={{ width: `${item[1] * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className={styles.controls}>
                <button className={styles.resultButton} onClick={onCancel}>
                    Try Again
                </button>
            </div>
        </div>
    );
}

// Show error state
if (error && !isProcessing) {
    return (
        <div className={styles.resultContainer}>
            <div className={styles.resultHeader}>
                <AlertCircle size={32} color="#ef4444" />
                <h1 className={styles.resultTitle}>Processing Error</h1>
            </div>

            <div className={styles.errorBox}>
                <p className={styles.errorText}>{error}</p>
            </div>

            <p style={{ color: '#888', fontSize: '14px', marginBottom: '24px', textAlign: 'center' }}>
                Please try again with a different audio file.
            </p>

            <div className={styles.controls}>
                <button className={styles.resultButton} onClick={onCancel}>
                    Try Again
                </button>
            </div>
        </div>
    );
}

    

    // Show processing state
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                Please wait...
            </h1>


            <div className={styles.progressContainer}>
                <div className={styles.progressCircle}>
                    <svg className={styles.svgCircle} viewBox="0 0 200 200">
                        <circle className={styles.circleBg} cx="100" cy="100" r="90" />
                        <circle
                            className={styles.circleProgress}
                            cx="100"
                            cy="100"
                            r="90"
                            style={{ 
                                strokeDashoffset: 565 - (565 * (progress / 100)),
                                transition: 'stroke-dashoffset 0.3s ease'
                            }}
                        />
                    </svg>
                    <div className={styles.progressText}>{Math.round(progress)}%</div>
                    <div className={styles.dot} style={{
                        top: '28px',
                        right: '45px',
                        opacity: isProcessing ? 1 : 0
                    }}></div>
                </div>
            </div>

            <div className={styles.controls}>
                <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                    <button 
                        className={styles.cancelButton} 
                        onClick={onCancel}
                        disabled={!isProcessing}
                        style={{ opacity: isProcessing ? 1 : 0.5 }}
                    >
                        <StopCircle size={32} color="#fff" />
                    </button>
                    <span className={styles.buttonLabel}>Cancel process</span>
                </div>
            </div>
        </div>
    );
};

export default ProcessingView;
