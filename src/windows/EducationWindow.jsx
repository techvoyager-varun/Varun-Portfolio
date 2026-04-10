import React, { memo } from 'react';
import { education } from '../data/education';
import styles from '../styles/Experience.module.css';

function EducationWindow() {
  return (
    <div className={styles.experience}>
      <h1 className={styles.title}>Education</h1>
      <p className={styles.subtitle}>Academic background and qualifications.</p>

      <div className={styles.timeline}>
        <div className={styles.timelineLine} />

        {education.map((entry, index) => (
          <div key={index} className={styles.timelineEntry}>
            <div className={`${styles.dot} ${entry.end === 'Present' ? styles.dotCurrent : ''}`} />
            <div className={styles.company}>{entry.institution}</div>
            <div className={styles.role}>{entry.degree}</div>
            <div className={styles.dateRow}>
              {entry.start} – {entry.end}
              {entry.end === 'Present' && <span className={styles.currentBadge}>Current</span>}
            </div>
            <div className={styles.desc}>
              {entry.location}
              <ul>
                {entry.details.map((detail, detailIdx) => (
                  <li key={detailIdx}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(EducationWindow);
