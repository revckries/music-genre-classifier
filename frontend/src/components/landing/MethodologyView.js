"use client";

import React from 'react';
import styles from '../../styles/landing/MethodologyView.module.css';
import { motion } from 'framer-motion';
import { Database, Layers, Cpu, FileAudio, BarChart, Brain } from 'lucide-react';

const steps = [
    {
        icon: <FileAudio size={40} color="#6c5ce7" />,
        title: "Audio Input & Preprocessing",
        description: "Raw audio is converted into a digital signal. We then slice it into 3-second segments to ensure consistent analysis windows."
    },
    {
        icon: <BarChart size={40} color="#a29bfe" />,
        title: "Spectrogram Generation",
        description: "We convert the audio segments into Mel-Spectrograms. This visual representation allows our model to 'see' the audio frequencies over time."
    },
    {
        icon: <Layers size={40} color="#74b9ff" />,
        title: "Feature Extraction",
        description: "A Convolutional Neural Network (CNN) scans the spectrograms, identifying complex patterns like rhythmic structures and harmonic content."
    },
    {
        icon: <Brain size={40} color="#00b894" />,
        title: "Classification",
        description: "The extracted features are passed through fully connected layers, which output a probability distribution across our supported genres."
    }
];

const MethodologyView = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <motion.h1
                    className={styles.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    How It Works
                </motion.h1>
                <motion.p
                    className={styles.subtitle}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    A deep dive into the architecture and pipeline behind our genre classification model.
                </motion.p>
            </div>

            <div className={styles.pipeline}>
                {steps.map((step, index) => (
                    <div key={index} className={styles.stepWrapper}>
                        <motion.div
                            className={styles.card}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <div className={styles.iconWrapper}>
                                {step.icon}
                            </div>
                            <div className={styles.content}>
                                <h3 className={styles.cardTitle}>{step.title}</h3>
                                <p className={styles.cardDescription}>{step.description}</p>
                            </div>
                        </motion.div>
                        {index < steps.length - 1 && (
                            <motion.div
                                className={styles.connector}
                                initial={{ height: 0 }}
                                whileInView={{ height: 40 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                            />
                        )}
                    </div>
                ))}
            </div>

            <div className={styles.techStack}>
                <h2 className={styles.sectionTitle}>Technical Specifications</h2>
                <div className={styles.grid}>
                    <div className={styles.techCard}>
                        <Database size={32} color="#fdcb6e" style={{ marginBottom: '15px' }} />
                        <h4>Dataset</h4>
                        <p>GTZAN Genre Collection</p>
                        <span className={styles.tag}>1000 Tracks</span>
                    </div>
                    <div className={styles.techCard}>
                        <Cpu size={32} color="#ff7675" style={{ marginBottom: '15px' }} />
                        <h4>Model Architecture</h4>
                        <p>Custom 5-Layer CNN</p>
                        <span className={styles.tag}>TensorFlow</span>
                    </div>
                    <div className={styles.techCard}>
                        <Activity size={32} color="#00cec9" style={{ marginBottom: '15px' }} />
                        <h4>Input Shape</h4>
                        <p>Mel-Spectrogram</p>
                        <span className={styles.tag}>128x128 px</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper component for the icon in the last section
const Activity = ({ size, color, style }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
    >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
    </svg>
);

export default MethodologyView;
