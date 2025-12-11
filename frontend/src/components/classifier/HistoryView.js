"use client";

import React from 'react';
import styles from '../../styles/classifier/HistoryView.module.css';
import { ArrowLeft, Music, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const HistoryView = ({ onBack, history = [], onClearHistory }) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button className={styles.backButton} onClick={onBack}>
                    <ArrowLeft size={20} />
                </button>
                <h2 className={styles.title}>History</h2>
            </div>
            <div className={styles.list}>
                {history.length === 0 ? (
                    <div style={{ padding: '24px', textAlign: 'center', color: '#666' }}>
                        No history yet — record your first track!
                    </div>
                ) : (
                    history.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className={styles.historyItem}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <div className={styles.iconContainer}>
                                <Music size={20} color="#fff" />
                            </div>
                            <div className={styles.details}>
                                <div className={styles.songTitle}>{item.genre}</div>
                                <div className={styles.genre}>{(item.confidence * 100).toFixed(1)}% confidence</div>
                            </div>
                            <div className={styles.date}>{new Date(item.timestamp).toLocaleString()}</div>
                        </motion.div>
                    ))
                )}
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '20px' }}>
                <button className={styles.clearButton} onClick={onClearHistory} disabled={history.length === 0}>
                    Clear History
                </button>
            </div>
        </div>
    );
};

export default HistoryView;
