"use client";

import React from 'react';
import styles from '../../styles/classifier/HistoryView.module.css';
import { ArrowLeft, Music, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const historyData = [
    { id: 1, title: "Midnight Jazz", genre: "Jazz", date: "2 mins ago" },
    { id: 2, title: "Electric Dreams", genre: "Electronic", date: "1 hour ago" },
    { id: 3, title: "Summer Vibes", genre: "Pop", date: "Yesterday" },
    { id: 4, title: "Heavy Metal Thunder", genre: "Metal", date: "2 days ago" },
    { id: 5, title: "Classical Symphony", genre: "Classical", date: "Last week" },
];

const HistoryView = ({ onBack }) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button className={styles.backButton} onClick={onBack}>
                    <ArrowLeft size={20} />
                </button>
                <h2 className={styles.title}>History</h2>
            </div>

            <div className={styles.list}>
                {historyData.map((item, index) => (
                    <motion.div
                        key={item.id}
                        className={styles.historyItem}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className={styles.iconContainer}>
                            <Music size={20} color="#fff" />
                        </div>
                        <div className={styles.details}>
                            <div className={styles.songTitle}>{item.title}</div>
                            <div className={styles.genre}>{item.genre}</div>
                        </div>
                        <div className={styles.date}>{item.date}</div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default HistoryView;
