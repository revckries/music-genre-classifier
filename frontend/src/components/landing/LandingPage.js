import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Search, Play, ArrowRight, MessageCircle, Smartphone, BarChart, Users, HelpCircle, Music, Mic, Activity, Brain, Zap } from 'lucide-react';
import styles from '../../styles/landing/LandingPage.module.css';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.faqItem} onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className={styles.faqQuestion} style={{ color: isOpen ? '#a29bfe' : '#fff' }}>{question}</div>
                <div style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>▼</div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div className={styles.faqAnswer} style={{ marginTop: '10px' }}>{answer}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const LandingPage = ({ onGetStarted, onViewFeatures, onViewGenres, onViewMethodology }) => {
    const waveRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: waveRef,
        offset: ["start end", "end start"]
    });

    const waveX = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
    const waveOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

    return (
        <div className={styles.container}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>Identify Your <br />Sound</h1>
                    <p className={styles.heroSubtitle}>
                        Unlock the DNA of your music. Our advanced AI instantly classifies genres,
                        detects beats, and analyzes audio characteristics with precision.
                    </p>
                    <button className={styles.primaryBtn} onClick={onGetStarted}>Start Analyzing</button>
                </div>
                <motion.div
                    className={styles.heroCard}
                    initial={{ rotate: -5, y: 20 }}
                    animate={{ rotate: -5, y: 0 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                >
                    <div className={styles.heroCardImage} style={{ background: 'url("landing_image.webp")', backgroundSize: 'cover', backgroundPosition: 'center' }} />
                    <div style={{ color: '#fff' }}>
                        <h4>Genre Detected</h4>
                        <p style={{ fontSize: '12px', color: '#888' }}>Lo-Fi Hip Hop • 98% Confidence</p>
                    </div>
                </motion.div>
            </section>



            {/* Wave Section (Parallax) */}
            <section className={styles.waveSection} ref={waveRef}>
                <div className={styles.waveBg} />
                <motion.div
                    className={styles.waveGraphic}
                    style={{ x: waveX, opacity: waveOpacity }}
                />
                <div className={styles.waveContent}>
                    <div className={styles.waveText}>
                        <h2 className={styles.sectionTitle}>Real-time Analysis & <br />Classification</h2>
                        <p className={styles.heroSubtitle}>
                            Record directly from your browser or upload tracks.
                            Watch as our neural network deconstructs the audio waves in real-time.
                        </p>
                        <button className={styles.primaryBtn} style={{ background: '#fff', color: '#000' }} onClick={onGetStarted}>Try Live Demo</button>
                    </div>
                    <div className={styles.waveCard}>
                        <div style={{ width: '100%', height: '70%', background: 'linear-gradient(45deg, #ff7675, #d63031)', borderRadius: '10px', marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Activity size={48} color="#fff" />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h4 style={{ margin: 0 }}>Processing...</h4>
                                <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>Analyzing frequencies</p>
                            </div>
                            <div style={{ width: '10px', height: '10px', background: '#00b894', borderRadius: '50%', boxShadow: '0 0 10px #00b894' }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Chat Section -> Insights Section */}
            <section className={styles.chatSection}>
                <div className={styles.chatVisual}>
                    <motion.div className={styles.chatBubble} initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                        <span style={{ color: '#a29bfe' }}>BPM:</span> 128 Detected
                    </motion.div>
                    <motion.div className={`${styles.chatBubble} ${styles.right}`} initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                        <span style={{ color: '#fab1a0' }}>Key:</span> C Minor
                    </motion.div>
                    <motion.div className={styles.chatBubble} initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
                        <span style={{ color: '#55efc4' }}>Genre:</span> Electronic / House
                    </motion.div>
                </div>
                <div className={styles.heroContent}>
                    <h2 className={styles.sectionTitle}>Understand the <br />nuances of every beat</h2>
                    <p className={styles.heroSubtitle}>
                        Get deep insights into tempo, key, and mood. Perfect for producers,
                        DJs, and music enthusiasts wanting to categorize their library.
                    </p>
                    <button className={styles.primaryBtn} style={{ background: '#2d2d2d' }} onClick={onViewFeatures}>View Features</button>
                </div>
            </section>

            {/* Mobile App Section -> Platform Section */}
            <section className={styles.appSection}>
                <div className={styles.heroContent}>
                    <h2 className={styles.sectionTitle}>Take the classifier <br />anywhere you go</h2>
                    <p className={styles.heroSubtitle}>
                        Optimized for all devices. Whether you're in the studio or on the go,
                        identify music genres instantly with our responsive web app.
                    </p>
                </div>
                <div className={styles.phonesVisual}>
                    <div className={`${styles.phone} ${styles.phone1}`}>
                        <div style={{ padding: '20px', height: '100%', background: '#1e1e1e', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Music size={48} color="#6c5ce7" style={{ marginBottom: '20px' }} />
                            <div style={{ width: '80%', height: '4px', background: '#333', borderRadius: '2px', marginBottom: '10px' }} />
                            <div style={{ width: '60%', height: '4px', background: '#333', borderRadius: '2px' }} />
                        </div>
                    </div>
                    <div className={`${styles.phone} ${styles.phone2}`}>
                        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(180deg, #2d3436, #000)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>Rock</div>
                                <div style={{ color: '#888' }}>Confidence: 92%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gems Section -> Genres Section */}
            <section className={styles.gemsSection}>
                <h2 className={styles.sectionTitle} style={{ textAlign: 'center' }}>Supported <br />Genres</h2>
                <div className={styles.gemsGrid}>
                    {['Pop', 'Rock', 'Jazz', 'Classical'].map((genre, i) => (
                        <div key={i} className={styles.gemCard}>
                            <div className={styles.gemIcon}>🎵</div>
                            <h4>{genre}</h4>
                            <p style={{ fontSize: '12px', color: '#666' }}>High Accuracy</p>
                        </div>
                    ))}
                </div>
                <button className={styles.primaryBtn} style={{ marginTop: '40px', background: '#fff', color: '#000' }} onClick={onViewGenres}>See All Genres</button>
            </section>

            {/* Chart Section -> Accuracy Section */}
            <section className={styles.chartSection}>
                <div className={styles.chartContainer}>
                    <div style={{ maxWidth: '400px' }}>
                        <h2 className={styles.sectionTitle} style={{ fontSize: '36px' }}>Unmatched <br />Accuracy</h2>
                        <p className={styles.heroSubtitle}>
                            Trained on millions of tracks, our model delivers industry-leading
                            classification performance across diverse musical styles.
                        </p>
                        <button className={styles.primaryBtn} style={{ background: '#fff', color: '#000' }} onClick={onViewMethodology}>View Methodology</button>
                    </div>
                    <div className={styles.chartVisual}>
                        {[20, 40, 60, 50, 80, 70, 90, 95, 98].map((h, i) => (
                            <motion.div
                                key={i}
                                className={styles.chartBar}
                                initial={{ height: 0 }}
                                whileInView={{ height: `${h}%` }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Community Section -> Tech Stack */}
            <section className={styles.communitySection}>
                <h2 className={styles.sectionTitle}>Powered by <br />Advanced Tech</h2>
                <div className={styles.communityGrid}>
                    <div className={styles.communityCard}>
                        <div className={styles.cardIcon}>
                            <Brain size={32} color="#a29bfe" />
                        </div>
                        <h3>Deep Learning</h3>
                        <p>Convolutional Neural Networks (CNNs) for audio feature extraction.</p>
                    </div>
                    <div className={styles.communityCard}>
                        <div className={styles.cardIcon}>
                            <BarChart size={32} color="#74b9ff" />
                        </div>
                        <h3>Spectrograms</h3>
                        <p>Visual representation of the spectrum of frequencies.</p>
                    </div>
                    <div className={styles.communityCard}>
                        <div className={styles.cardIcon}>
                            <Zap size={32} color="#ffeaa7" />
                        </div>
                        <h3>Real-time</h3>
                        <p>Instant processing with WebAudio API and optimized models.</p>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className={styles.faqSection}>
                <h2 className={styles.sectionTitle} style={{ fontSize: '32px' }}>FAQ</h2>
                <div className={styles.faqList}>
                    {[
                        { q: 'How does the AI classify genres?', a: 'We use a Convolutional Neural Network (CNN) trained on thousands of audio tracks. It converts audio into visual spectrograms and analyzes patterns, similar to how image recognition works.' },
                        { q: 'What audio formats are supported?', a: 'Currently, we support real-time recording via your device microphone and file uploads for WAV and MP3 formats.' },
                        { q: 'Is my audio data private?', a: 'Yes. All audio processing happens in real-time. We do not permanently store your recordings on our servers.' },
                        { q: 'What is the accuracy of the model?', a: 'Our model achieves over 90% accuracy on standard test datasets, with particularly high performance on distinct genres like Classical, Metal, and Jazz.' }
                    ].map((item, i) => (
                        <FAQItem key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </section>

            {/* Footer CTA */}
            <section className={styles.footerCta}>
                <div className={`${styles.ctaCard} ${styles.artist}`}>
                    <h3>For Developers</h3>
                    <p>Explore the source code and contribute.</p>
                    <button className={styles.ctaBtn} onClick={() => window.open('https://github.com', '_blank')}>View on GitHub</button>
                </div>
                <div className={`${styles.ctaCard} ${styles.investor}`}>
                    <h3>For Researchers</h3>
                    <p>Access our datasets and models.</p>
                    <button className={styles.ctaBtn} onClick={() => window.open('https://www.kaggle.com/datasets/andradaolteanu/gtzan-dataset-music-genre-classification/data', '_blank')}>View Data</button>
                </div>
            </section>

            {/* Main Footer */}
            <footer className={styles.mainFooter}>
                <div className={styles.footerCol}>
                    <div className={styles.navLogo} style={{ marginBottom: '20px' }}>
                        <img src="/logo.png" alt="GENRE.AI" style={{ height: '40px', width: 'auto' }} />
                    </div>
                    <p style={{ color: '#666', fontSize: '14px' }}>
                        The future of music classification <br />and analysis.
                    </p>
                </div>
                <div className={styles.footerCol}>
                    <h4>Product</h4>
                    <a href="#">Classifier</a>
                    <a href="#">API</a>
                    <a href="#">Docs</a>
                </div>
                <div className={styles.footerCol}>
                    <h4>Company</h4>
                    <a href="#">About</a>
                    <a href="#">Blog</a>
                    <a href="#">Contact</a>
                </div>
                <div className={styles.footerCol}>
                    <h4>Legal</h4>
                    <a href="#">Privacy</a>
                    <a href="#">Terms</a>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
