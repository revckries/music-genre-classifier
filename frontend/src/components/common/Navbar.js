import React from 'react';
import styles from '../../styles/Navbar.module.css';

const Navbar = ({ currentView, onViewChange }) => {
    const navItems = [
        { id: 'landing', label: 'Home' },
        { id: 'features', label: 'Features' },
        { id: 'genres', label: 'Genres' },
        { id: 'home', label: 'Classifier' },
    ];

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <img src="/logo.png" alt="GENRE.AI" style={{ height: '40px', width: 'auto' }} />
            </div>

            <div className={styles.navItems}>
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        className={`${styles.navItem} ${currentView === item.id || (item.id === 'home' && (currentView === 'recording' || currentView === 'processing')) ? styles.active : ''}`}
                        onClick={() => onViewChange(item.id)}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            <div className={styles.actions}>
                <button className={`${styles.actionBtn} ${styles.primaryBtn}`} onClick={() => onViewChange('home')}>
                    Start Now
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
