"use client";

import React from 'react';
import styles from '../../styles/classifier/HomeView.module.css';
import { Mic, History, Play } from 'lucide-react';

const HomeView = ({ onStart, onHistory, hasHistory = false, onUpload }) => {
    const fileInputRef = React.useRef(null);

    const handleUploadClick = () => {
        if (fileInputRef.current) fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file && onUpload) onUpload(file);
        // clear the input so same file can be uploaded again
        e.target.value = '';
    };
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
                <button 
                    className={styles.sideButton} 
                    onClick={onHistory}
                    disabled={!hasHistory}
                    style={{ opacity: hasHistory ? 1 : 0.5 }}
                    title={hasHistory ? 'View history' : 'No history yet'}
                >
                    <History size={20} />
                </button>

                <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                    <button className={styles.mainButton} onClick={onStart}>
                        <Mic size={32} color="#fff" />
                    </button>
                    <span className={styles.buttonLabel}>Record Now</span>
                </div>

                {/* Hidden file input triggered by Upload side button */}
                <input ref={fileInputRef} type="file" accept="audio/*" style={{ display: 'none' }} onChange={handleFileChange} />
                <button 
                    className={styles.sideButton} 
                    onClick={handleUploadClick}
                    title="Upload audio file"
                    style={{ marginLeft: '8px' }}
                >
                    {/* upload / cloud icon */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 3v10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 7l4-4 4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default HomeView;
