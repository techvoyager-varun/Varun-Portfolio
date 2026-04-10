import React, { memo } from 'react';
import { achievements } from '../data/achievements';
import styles from '../styles/About.module.css';

function AchievementsWindow() {
  return (
    <div className={styles.about}>
      <div className={styles.content}>
        <h1 style={{fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px'}}>Achievements</h1>
        
        <ul className={styles.bulletList} style={{gap: '12px', display: 'flex', flexDirection: 'column'}}>
          {achievements.map((item, idx) => (
            <li key={idx} style={{lineHeight: 1.5, fontSize: '14px', color: 'var(--text-secondary)'}}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default memo(AchievementsWindow);
