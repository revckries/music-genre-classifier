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

                mediaRecorderRef.current.onstop = async () => {
                    const mimeType = mediaRecorderRef.current.mimeType || 'audio/webm';
                    const recordedBlob = new Blob(audioChunksRef.current, { type: mimeType });

                    try {
                        // Convert WebM/Ogg to WAV client-side to ensure backend can read it without ffmpeg
                        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                        const arrayBuffer = await recordedBlob.arrayBuffer();
                        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

                        // Function to convert AudioBuffer to WAV Blob
                        const bufferToWav = (abuffer) => {
                            const numOfChan = abuffer.numberOfChannels;
                            const length = abuffer.length * numOfChan * 2 + 44;
                            const buffer = new ArrayBuffer(length);
                            const view = new DataView(buffer);
                            const channels = [];
                            let i, sample, offset = 0, pos = 0;

                            // Write WAVE header
                            const writeString = (view, offset, string) => {
                                for (let i = 0; i < string.length; i++) {
                                    view.setUint8(offset + i, string.charCodeAt(i));
                                }
                            };

                            writeString(view, 0, 'RIFF');
                            view.setUint32(4, 36 + abuffer.length * numOfChan * 2, true);
                            writeString(view, 8, 'WAVE');
                            writeString(view, 12, 'fmt ');
                            view.setUint32(16, 16, true);
                            view.setUint16(20, 1, true);
                            view.setUint16(22, numOfChan, true);
                            view.setUint32(24, abuffer.sampleRate, true);
                            view.setUint32(28, abuffer.sampleRate * 2 * numOfChan, true);
                            view.setUint16(32, numOfChan * 2, true);
                            view.setUint16(34, 16, true);
                            writeString(view, 36, 'data');
                            view.setUint32(40, abuffer.length * numOfChan * 2, true);

                            // Interleave channels
                            for (i = 0; i < abuffer.numberOfChannels; i++)
                                channels.push(abuffer.getChannelData(i));

                            while (pos < abuffer.length) {
                                for (i = 0; i < numOfChan; i++) {
                                    sample = Math.max(-1, Math.min(1, channels[i][pos])); // clamp
                                    sample = (sample < 0 ? sample * 0x8000 : sample * 0x7FFF) | 0; // scale to 16-bit
                                    view.setInt16(44 + offset, sample, true); // write 16-bit sample
                                    offset += 2;
                                }
                                pos++;
                            }

                            return new Blob([buffer], { type: 'audio/wav' });
                        };

                        const wavBlob = bufferToWav(audioBuffer);
                        const wavFile = new File([wavBlob], 'recording.wav', { type: 'audio/wav' });

                        onStop(wavFile);

                    } catch (error) {
                        console.error("WAV conversion failed:", error);
                        // If conversion fails, fallback to sending the original blob
                        const ext = mimeType.split('/')[1] || 'webm';
                        const file = new File([recordedBlob], `recording.${ext}`, { type: mimeType });
                        onStop(file);
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
