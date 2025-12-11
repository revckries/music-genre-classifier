"use client";

import React, { useEffect, useState, useRef } from 'react';
import styles from '../../styles/classifier/RecordingView.module.css';
import { MicOff, Settings, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const RecordingView = ({ onStop }) => {
    const [time, setTime] = useState(0);
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    useEffect(() => {
        let interval;
        if (isRecording) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRecording]);

    useEffect(() => {
        const startRecording = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaRecorderRef.current = new MediaRecorder(stream);
                audioChunksRef.current = [];

                mediaRecorderRef.current.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        audioChunksRef.current.push(event.data);
                    }
                };

                // Helper: encode Float32Array audio buffer to 16-bit PCM WAV
                function encodeWAV(samples, sampleRate, numChannels) {
                    const buffer = new ArrayBuffer(44 + samples.length * 2);
                    const view = new DataView(buffer);

                    function writeString(view, offset, string) {
                        for (let i = 0; i < string.length; i++) {
                            view.setUint8(offset + i, string.charCodeAt(i));
                        }
                    }

                    let offset = 0;
                    writeString(view, offset, 'RIFF'); offset += 4;
                    view.setUint32(offset, 36 + samples.length * 2, true); offset += 4;
                    writeString(view, offset, 'WAVE'); offset += 4;
                    writeString(view, offset, 'fmt '); offset += 4;
                    view.setUint32(offset, 16, true); offset += 4; // subchunk1Size
                    view.setUint16(offset, 1, true); offset += 2; // PCM
                    view.setUint16(offset, numChannels, true); offset += 2;
                    view.setUint32(offset, sampleRate, true); offset += 4;
                    view.setUint32(offset, sampleRate * numChannels * 2, true); offset += 4; // byteRate
                    view.setUint16(offset, numChannels * 2, true); offset += 2; // blockAlign
                    view.setUint16(offset, 16, true); offset += 2; // bitsPerSample
                    writeString(view, offset, 'data'); offset += 4;
                    view.setUint32(offset, samples.length * 2, true); offset += 4;

                    // Write PCM samples
                    let pos = 44;
                    for (let i = 0; i < samples.length; i++, pos += 2) {
                        const s = Math.max(-1, Math.min(1, samples[i]));
                        view.setInt16(pos, s < 0 ? s * 0x8000 : s * 0x7fff, true);
                    }

                    return new Blob([view], { type: 'audio/wav' });
                }

                mediaRecorderRef.current.onstop = async () => {
                    const recordedBlob = new Blob(audioChunksRef.current); // leave type unspecified

                    // Try to convert to WAV client-side using AudioContext and resample to 22050 Hz
                    try {
                        const arrayBuffer = await recordedBlob.arrayBuffer();
                        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

                        const TARGET_SR = 22050;
                        let processedBuffer = audioBuffer;

                        if (Math.round(audioBuffer.sampleRate) !== TARGET_SR) {
                            // Resample using OfflineAudioContext
                            const offlineCtx = new OfflineAudioContext(audioBuffer.numberOfChannels, Math.ceil(audioBuffer.duration * TARGET_SR), TARGET_SR);
                            const src = offlineCtx.createBufferSource();
                            src.buffer = audioBuffer;
                            src.connect(offlineCtx.destination);
                            src.start(0);
                            processedBuffer = await offlineCtx.startRendering();
                        }

                        // Interleave channels from processedBuffer
                        const numChannels = processedBuffer.numberOfChannels;
                        const length = processedBuffer.length * numChannels;
                        const samples = new Float32Array(length);
                        let offset = 0;
                        for (let i = 0; i < processedBuffer.length; i++) {
                            for (let ch = 0; ch < numChannels; ch++) {
                                samples[offset++] = processedBuffer.getChannelData(ch)[i];
                            }
                        }

                        const wavBlob = encodeWAV(samples, TARGET_SR, numChannels);
                        const wavFile = new File([wavBlob], 'recording.wav', { type: 'audio/wav' });
                        onStop(wavFile);
                    } catch (err) {
                        // Fallback: send original blob if conversion fails
                        console.warn('Client-side WAV conversion failed, sending original blob:', err);
                        const fallbackType = recordedBlob.type || 'audio/webm';
                        const webmFile = new File([recordedBlob], 'recording.' + (fallbackType.split('/')[1] || 'webm'), { type: fallbackType });
                        onStop(webmFile);
                    }

                    // Stop all tracks to release microphone
                    stream.getTracks().forEach(track => track.stop());
                };

                mediaRecorderRef.current.start();
                setIsRecording(true);
            } catch (error) {
                console.error("Error accessing microphone:", error);
                alert("Could not access microphone. Please ensure you have granted permission.");
            }
        };

        startRecording();

        return () => {
            if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
                mediaRecorderRef.current.stop();
            }
        };
    }, [onStop]);

    const handleStopClick = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const pad = (num) => num.toString().padStart(2, '0');
        return `${pad(hours)} : ${pad(minutes)} : ${pad(seconds)}`;
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Recording..</h1>

            <div className={styles.waveContainer}>
                <svg viewBox="0 0 1440 320" className={styles.waveSvg} preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="waveGradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
                        </linearGradient>
                    </defs>
                    <motion.path
                        fill="url(#waveGradient)"
                        animate={{
                            d: [
                                "M0,160 C320,180 420,100 640,140 C860,180 980,240 1120,200 C1260,160 1380,100 1440,120 V320 H0 Z",
                                "M0,160 C320,140 420,220 640,180 C860,140 980,100 1120,140 C1260,180 1380,240 1440,220 V320 H0 Z",
                                "M0,160 C320,180 420,100 640,140 C860,180 980,240 1120,200 C1260,160 1380,100 1440,120 V320 H0 Z"
                            ]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 4,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.path
                        fill="rgba(139, 92, 246, 0.3)"
                        animate={{
                            d: [
                                "M0,160 C320,140 420,220 640,180 C860,140 980,100 1120,140 C1260,180 1380,240 1440,220 V320 H0 Z",
                                "M0,160 C320,180 420,100 640,140 C860,180 980,240 1120,200 C1260,160 1380,100 1440,120 V320 H0 Z",
                                "M0,160 C320,140 420,220 640,180 C860,140 980,100 1120,140 C1260,180 1380,240 1440,220 V320 H0 Z"
                            ]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 5,
                            ease: "easeInOut",
                            delay: 0.5
                        }}
                    />
                </svg>
            </div>

            <div className={styles.timerContainer}>
                <div className={styles.timer}>{formatTime(time)}</div>
            </div>

            <div className={styles.controls}>
                <button className={styles.sideButton}>
                    <Settings size={20} />
                </button>

                <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                    <button className={styles.stopButton} onClick={handleStopClick}>
                        <MicOff size={32} color="#fff" />
                    </button>
                    <span className={styles.buttonLabel}>Stop Recording</span>
                </div>

                <button className={styles.sideButton}>
                    <Play size={20} />
                </button>
            </div>
        </div>
    );
};

export default RecordingView;
