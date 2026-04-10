import React, { memo } from 'react';
import { skills } from '../data/skills';
import styles from '../styles/About.module.css';

function SkillsWindow() {
  return (
    <div className={styles.about}>
      <div className={styles.content}>
        <h1 style={{fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px'}}>Skills</h1>
        
        {skills.map((skillGroup, index) => (
          <div key={index} className={styles.focusBox} style={{marginBottom: '16px'}}>
            <h3 className={styles.sectionLabel}>{skillGroup.category}</h3>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px'}}>
              {skillGroup.items.map((item, idx) => (
                <span key={idx} style={{background: 'var(--border)', padding: '4px 10px', borderRadius: '4px', fontSize: '13px', color: 'var(--text-primary)'}}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(SkillsWindow);
