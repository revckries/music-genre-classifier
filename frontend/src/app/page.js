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

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleGetStarted = () => setView('home');
  const handleStart = () => setView('recording');
  const handleStop = (blob) => {
    setAudioBlob(blob);
    setView('processing');
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
                style={{ width: '100%', maxWidth: '800px', display: 'flex', justifyContent: 'center' }}
              >
                <HomeView onStart={handleStart} onHistory={() => setView('history')} />
              </motion.div>
            )}

            {view === 'recording' && (
              <motion.div
                key="recording"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                style={{ width: '100%', maxWidth: '800px', display: 'flex', justifyContent: 'center' }}
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
                style={{ width: '100%', maxWidth: '800px', display: 'flex', justifyContent: 'center' }}
              >
                <ProcessingView onCancel={handleCancel} audioBlob={audioBlob} />
              </motion.div>
            )}

            {view === 'history' && (
              <motion.div
                key="history"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                style={{ width: '100%', maxWidth: '800px', display: 'flex', justifyContent: 'center' }}
              >
                <HistoryView onBack={handleCancel} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </main>
  );
}
