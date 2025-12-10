"use client";

import React from 'react';
import styles from '../../styles/landing/FeaturesView.module.css';
import { motion } from 'framer-motion';
import { Activity, Music, Mic, BarChart2, Share2, Database, Shield, Zap } from 'lucide-react';

const features = [
    {
        icon: <Activity size={32} color="#6c5ce7" />,
        title: "Real-time Analysis",
        description: "Analyze audio streams instantly with our optimized WebAudio pipeline. No upload required for live recording."
    },
    {
        icon: <Music size={32} color="#a29bfe" />,
        title: "Genre Classification",
        description: "Detects over 10 different music genres including Pop, Rock, Jazz, Classical, Hip-Hop, and Electronic with high accuracy."
    },
    {
        icon: <Mic size={32} color="#74b9ff" />,
        title: "Voice & Audio Input",
        description: "Seamlessly record from your microphone or upload existing audio files (MP3, WAV) for analysis."
    },
    {
        icon: <BarChart2 size={32} color="#00b894" />,
        title: "BPM & Key Detection",
        description: "Get detailed musical insights including Beats Per Minute (BPM) and musical key estimation."
    },
    {
        icon: <Database size={32} color="#fdcb6e" />,
        title: "History Tracking",
        description: "Keep track of all your analyses. Review past results, listen to recordings, and compare classifications."
    },
    {
        icon: <Share2 size={32} color="#e17055" />,
        title: "Export Data",
        description: "Export your analysis results as JSON or CSV for further processing or integration into other tools."
    },
    {
        icon: <Shield size={32} color="#d63031" />,
        title: "Privacy First",
        description: "All processing happens locally or securely. Your audio data is never stored permanently on our servers."
    },
    {
        icon: <Zap size={32} color="#fd79a8" />,
        title: "Lightning Fast",
        description: "Powered by TensorFlow.js, our models run directly in your browser for zero-latency feedback."
    }
];

const FeaturesView = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <motion.h1
                    className={styles.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Powerful Features for 
                    <br/> Music Analysis
                </motion.h1>
                <motion.p
                    className={styles.subtitle}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Discover what makes our genre classifier the most advanced tool for music enthusiasts and professionals.
                </motion.p>
            </div>

            <div className={styles.grid}>
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        className={styles.card}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ y: -10, borderColor: 'rgba(108, 92, 231, 0.5)' }}
                    >
                        <div className={styles.iconWrapper}>
                            {feature.icon}
                        </div>
                        <h3 className={styles.cardTitle}>{feature.title}</h3>
                        <p className={styles.cardDescription}>{feature.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default FeaturesView;
