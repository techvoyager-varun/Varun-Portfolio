import React, { memo, useState } from 'react';
import { experience } from '../data/experience';
import styles from '../styles/Experience.module.css';

function ExperienceWindow() {
  const [expandedCert, setExpandedCert] = useState(null);

  const formatDate = (d) => {
    if (!d) return 'Present';
    const [y, m] = d.split('-');
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${months[parseInt(m) - 1]} ${y}`;
  };

  return (
    <div className={styles.experience}>
      {expandedCert && (
        <div className={styles.certOverlay} onClick={() => setExpandedCert(null)}>
          <img src={expandedCert} alt="Certificate" className={styles.certExpanded} />
        </div>
      )}
      <h1 className={styles.title}>Experience</h1>
      <p className={styles.subtitle}>Full timeline of roles and projects.</p>

      <div className={styles.timeline}>
        <div className={styles.timelineLine} />

        {experience.map((entry, index) => (
          <div key={index} className={styles.timelineEntry}>
            <div className={`${styles.dot} ${entry.current ? styles.dotCurrent : ''}`} />
            <div className={styles.company}>{entry.company}</div>
            <div className={styles.role}>{entry.role}</div>
            <div className={styles.dateRow}>
              {formatDate(entry.start)} – {formatDate(entry.end)}
              {entry.current && <span className={styles.currentBadge}>Current</span>}
            </div>
            <p className={styles.desc}>{entry.description}</p>
            <div className={styles.tags}>
              {entry.tags.map((t) => (
                <span key={t} className={styles.tag}>{t}</span>
              ))}
            </div>
            {entry.certificate && (
              <div className={styles.certSection}>
                <div className={styles.certLabel}>Certificate</div>
                <img
                  src={entry.certificate}
                  alt="Certificate"
                  className={styles.certImage}
                  onClick={() => setExpandedCert(entry.certificate)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(ExperienceWindow);
