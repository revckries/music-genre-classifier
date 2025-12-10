"use client";

import React from 'react';
import styles from '../../styles/landing/GenresView.module.css';
import { motion } from 'framer-motion';

const genres = [
    { name: 'Pop', color: '#ff7675', description: 'Catchy melodies and repetitive structures.' },
    { name: 'Rock', color: '#74b9ff', description: 'Electric guitars, strong rhythms, and energetic vocals.' },
    { name: 'Jazz', color: '#fdcb6e', description: 'Complex harmonies, improvisation, and swing rhythms.' },
    { name: 'Classical', color: '#a29bfe', description: 'Orchestral instruments and formal structures.' },
    { name: 'Hip-Hop', color: '#55efc4', description: 'Rhythmic speech and driving beats.' },
    { name: 'Electronic', color: '#00cec9', description: 'Synthesizers and digital production techniques.' },
    { name: 'Blues', color: '#0984e3', description: 'Melancholic lyrics and 12-bar chord progressions.' },
    { name: 'Country', color: '#e17055', description: 'Acoustic instruments and storytelling lyrics.' },
    { name: 'Reggae', color: '#00b894', description: 'Offbeat rhythms and heavy basslines.' },
    { name: 'Metal', color: '#636e72', description: 'Distorted guitars and aggressive vocals.' },
    { name: 'Folk', color: '#fab1a0', description: 'Traditional instruments and cultural storytelling.' },
    { name: 'Disco', color: '#fd79a8', description: 'Four-on-the-floor beats and danceable rhythms.' },
];

const GenresView = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <motion.h1
                    className={styles.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Explore Music Genres
                </motion.h1>
                <motion.p
                    className={styles.subtitle}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Our AI model is trained to recognize a wide variety of musical styles with high precision.
                </motion.p>
            </div>

            <div className={styles.grid}>
                {genres.map((genre, index) => (
                    <motion.div
                        key={index}
                        className={styles.card}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        whileHover={{ y: -10, borderColor: genre.color }}
                    >
                        <div className={styles.iconWrapper} style={{ background: `${genre.color}20` }}>
                            <span style={{ fontSize: '32px' }}>🎵</span>
                        </div>
                        <h3 className={styles.cardTitle} style={{ color: genre.color }}>{genre.name}</h3>
                        <p className={styles.cardDescription}>{genre.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default GenresView;
