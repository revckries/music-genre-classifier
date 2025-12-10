"use client";

import React from 'react';
import styles from '../../styles/classifier/HomeView.module.css';
import { Mic, History, Play, Edit2 } from 'lucide-react';

const HomeView = ({ onStart, onHistory }) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                Ready to identify<br />the music genre?
            </h1>

            <div className={styles.orbContainer}>
                <div className={styles.orb}>
                    <div className={styles.wave}></div>
                    <div className={styles.wave} style={{ animationDelay: '-2s', opacity: 0.7 }}></div>
                    <div className={styles.wave} style={{ animationDelay: '-4s', opacity: 0.5 }}></div>
                </div>
            </div>

            <div className={styles.controls}>
                <button className={styles.sideButton} onClick={onHistory}>
                    <History size={20} />
                </button>

                <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                    <button className={styles.mainButton} onClick={onStart}>
                        <Mic size={32} color="#fff" />
                    </button>
                    <span className={styles.buttonLabel}>Record Now</span>
                </div>

                <button className={styles.sideButton}>
                    <Play size={20} />
                </button>
            </div>
        </div>
    );
};

export default HomeView;
