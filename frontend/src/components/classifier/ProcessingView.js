"use client";

import React from 'react';
import styles from '../../styles/classifier/ProcessingView.module.css';
import { StopCircle, Settings, Play } from 'lucide-react';

const ProcessingView = ({ onCancel, audioBlob }) => {
    React.useEffect(() => {
        if (audioBlob) {
            console.log("Processing audio blob:", audioBlob.size, "bytes");
            // Here we will eventually send the blob to the backend
        }
    }, [audioBlob]);
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                Please wait, your<br />recoding is currently<br />processing.
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
                            style={{ strokeDashoffset: 565 - (565 * 0.29) }} // 29%
                        />
                    </svg>
                    <div className={styles.progressText}>29%</div>
                    {/* Dot position is hardcoded in CSS for simplicity, ideally calculated via JS */}
                    <div className={styles.dot} style={{
                        top: '28px',
                        right: '45px'
                    }}></div>
                </div>
            </div>

            <div className={styles.controls}>
                <button className={styles.sideButton}>
                    <Settings size={20} />
                </button>

                <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                    <button className={styles.cancelButton} onClick={onCancel}>
                        <StopCircle size={32} color="#fff" />
                    </button>
                    <span className={styles.buttonLabel}>Cancel process</span>
                </div>

                <button className={styles.sideButton}>
                    <Play size={20} />
                </button>
            </div>
        </div>
    );
};

export default ProcessingView;
