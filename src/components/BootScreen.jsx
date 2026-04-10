import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/BootScreen.module.css';

export default function BootScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const alreadyBooted = sessionStorage.getItem('portfolio-booted');
    if (alreadyBooted) {
      setShow(false);
      onComplete();
      return;
    }

    // Animate progress 0→100 over 1.8s
    const start = Date.now();
    const duration = 1800;
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(interval);
        sessionStorage.setItem('portfolio-booted', 'true');
        setTimeout(() => setShow(false), 400);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {show && (
        <motion.div
          className={styles.bootScreen}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <div className={styles.logo}>
            Portfolio<span className={styles.logoAccent}>OS</span>
          </div>
          <div className={styles.loadingText}>Loading workspace...</div>
          <div className={styles.progressTrack}>
            <motion.div
              className={styles.progressBar}
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
