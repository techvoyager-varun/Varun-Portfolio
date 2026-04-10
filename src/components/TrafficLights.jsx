import React from 'react';
import styles from '../styles/Window.module.css';

export default function TrafficLights({ onClose, onMinimize, onMaximize, onRefresh }) {
  return (
    <div className={styles.trafficLights}>
      <button
        style={{background: 'none', border: 'none', padding: 0, outline: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center'}}
        onClick={(e) => { e.stopPropagation(); if (onRefresh) onRefresh(); }}
        aria-label="Refresh"
        title="Refresh Window"
      >
        <div className={styles.trafficDot} />
      </button>
      <button
        className={`${styles.trafficLight} ${styles.minimize}`}
        onClick={(e) => { e.stopPropagation(); onMinimize(); }}
        aria-label="Minimize"
      >
        −
      </button>
      <button
        className={`${styles.trafficLight} ${styles.maximize}`}
        onClick={(e) => { e.stopPropagation(); onMaximize(); }}
        aria-label="Maximize"
      >
        □
      </button>
      <button
        className={`${styles.trafficLight} ${styles.close}`}
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
}
