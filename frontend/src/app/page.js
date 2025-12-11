"use client";

import React, { useState } from 'react';
import styles from './page.module.css';
import HomeView from '@/components/classifier/HomeView';
import RecordingView from '@/components/classifier/RecordingView';
import ProcessingView from '@/components/classifier/ProcessingView';
import HistoryView from '@/components/classifier/HistoryView';
import LandingPage from '@/components/landing/LandingPage';
import FeaturesView from '@/components/landing/FeaturesView';
import GenresView from '@/components/landing/GenresView';
import MethodologyView from '@/components/landing/MethodologyView';
import Navbar from '@/components/common/Navbar';
import { AnimatePresence, motion } from 'framer-motion';

export default function Home() {
  const [view, setView] = useState('landing'); // 'landing', 'home', 'recording', 'processing', 'history', 'features', 'genres', 'methodology'
  const [isMounted, setIsMounted] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [history, setHistory] = useState([]);

  React.useEffect(() => {
    // load history from localStorage if present
    try {
      const raw = localStorage.getItem('genre_history');
      if (raw) setHistory(JSON.parse(raw));
    } catch (e) {
      console.warn('Failed to load history from localStorage', e);
    }
  }, []);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleGetStarted = () => setView('home');
  const handleStart = () => setView('recording');
  const handleStop = (blob) => {
    setAudioBlob(blob);
    setView('processing');
  };
  const handleProcessingComplete = (data) => {
    try {
      const item = {
        id: Date.now(),
        genre: data.genre,
        confidence: data.confidence,
        top_3: data.top_3,
        timestamp: new Date().toISOString(),
      };
      const newHistory = [item, ...history];
      setHistory(newHistory);
      localStorage.setItem('genre_history', JSON.stringify(newHistory));
    } catch (e) {
      console.warn('Failed to save history', e);
    }
  };
  const handleCancel = () => setView('home');

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <main className={styles.main}>
      <div className={`${styles.bgOrb} ${styles.bgOrb1}`} />
      <div className={`${styles.bgOrb} ${styles.bgOrb2}`} />
      <div className={`${styles.bgOrb} ${styles.bgOrb3}`} />

      {isMounted && (
        <Navbar currentView={view} onViewChange={handleViewChange} />
      )}

      {view === 'landing' ? (
        <LandingPage
          onGetStarted={handleGetStarted}
          onViewFeatures={() => setView('features')}
          onViewGenres={() => setView('genres')}
          onViewMethodology={() => setView('methodology')}
        />
      ) : view === 'features' ? (
        <FeaturesView />
      ) : view === 'genres' ? (
        <GenresView />
      ) : view === 'methodology' ? (
        <MethodologyView />
      ) : (
        <div className={styles.webContainer}>
          <AnimatePresence mode="wait">
            {view === 'home' && (
                <motion.div
                key="home"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                style={{ width: '100%', maxWidth: '1100px', display: 'flex', justifyContent: 'center' }}
              >
                <HomeView onStart={handleStart} onHistory={() => setView('history')} hasHistory={history.length > 0} onUpload={(file) => { setAudioBlob(file); setView('processing'); }} />
              </motion.div>
            )}

            {view === 'recording' && (
                <motion.div
                key="recording"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                style={{ width: '100%', maxWidth: '1100px', display: 'flex', justifyContent: 'center' }}
              >
                <RecordingView onStop={handleStop} />
              </motion.div>
            )}

            {view === 'processing' && (
                <motion.div
                key="processing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                style={{ width: '100%', maxWidth: '1100px', display: 'flex', justifyContent: 'center' }}
              >
                <ProcessingView onCancel={handleCancel} audioBlob={audioBlob} onProcessingComplete={(data) => { handleProcessingComplete(data); }} />
              </motion.div>
            )}

            {view === 'history' && (
                <motion.div
                key="history"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                style={{ width: '100%', maxWidth: '1100px', display: 'flex', justifyContent: 'center' }}
              >
                <HistoryView onBack={handleCancel} history={history} onClearHistory={() => { setHistory([]); localStorage.removeItem('genre_history'); setView('home'); }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </main>
  );
}
