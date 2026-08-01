import React, { memo, useState, useEffect } from 'react';
import { useDesktop } from '../context/DesktopContext';
import { WINDOW_DEFS } from '../components/Dock';
import styles from '../styles/About.module.css';

import EducationWindow from './EducationWindow';
import SkillsWindow from './SkillsWindow';
import AchievementsWindow from './AchievementsWindow';
import ExtracurricularWindow from './ExtracurricularWindow';
import OpenSourceWindow from './OpenSourceWindow';

const TABS = ['About', 'Education', 'Skills', 'Achievements', 'Open Source', 'Activities'];

function AboutWindow() {
  const { openWindow } = useDesktop();
  const [activeTab, setActiveTab] = useState('About');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderTabContent = (tabName) => {
    switch (tabName) {
      case 'Education': return <EducationWindow />;
      case 'Skills': return <SkillsWindow />;
      case 'Achievements': return <AchievementsWindow />;
      case 'Open Source': return <OpenSourceWindow />;
      case 'Activities': return <ExtracurricularWindow />;
      case 'About':
      default:
        return (
          <>
            <div className={styles.heroSection}>
              <div className={styles.nameRow}>
                <span className={styles.firstName}>Varun</span>
                <div className={styles.nameLine} />
                <span className={styles.lastName}>Rawat</span>
              </div>
            </div>
            <div className={styles.content}>
              <p className={styles.bio}>
                Based in Alwar, Rajasthan, India, I am a B.Tech Computer Science and Engineering student at The LNM Institute of Information Technology. I have a passion for building robust applications and solving complex algorithmic challenges.
              </p>
              <p className={styles.bio}>
                You can connect with me on{' '}
                <a href="https://linkedin.com/in/varun-rawat072" target="_blank" rel="noopener noreferrer" className={styles.link}>LinkedIn</a>,{' '}
                check out my code on <a href="https://github.com/techvoyager-varun" target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub</a>,{' '}
                view my <a href="https://codeforces.com/profile/techvoyager" target="_blank" rel="noopener noreferrer" className={styles.link}>Codeforces</a> and{' '}
                <a href="https://leetcode.com/u/Tech_Voyager" target="_blank" rel="noopener noreferrer" className={styles.link}>LeetCode</a> profiles, or{' '}
                <a href="#" className={styles.link} onClick={(e) => { e.preventDefault(); e.stopPropagation(); openWindow('contact', WINDOW_DEFS.contact); }}>get in touch</a>.
              </p>
              <div className={styles.focusBox}>
                <h3 className={styles.sectionLabel}>Current Focus</h3>
                <ul className={styles.bulletList}>
                  <li>Pursuing B.Tech in CSE at LNMIIT (Aug 2024 – Present).</li>
                  <li>Serving as a Teaching Assistant for Data Structures and Algorithms.</li>
                  <li>Continuously upskilling in full-stack development and competitive programming.</li>
                </ul>
              </div>
            </div>
          </>
        );
    }
  };

  if (!isMobile) {
    return (
      <div className={styles.aboutLayout}>
        <div className={styles.sidebar}>
          {TABS.map(tab => (
            <button
              key={tab}
              className={`${styles.sidebarBtn} ${activeTab === tab ? styles.sidebarBtnActive : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className={styles.mainContent}>
          {renderTabContent(activeTab)}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.accordionLayout}>
      {TABS.map(tab => (
        <div key={tab}>
          <button
            className={`${styles.accordionHeader} ${activeTab === tab ? styles.accordionHeaderActive : ''}`}
            onClick={() => setActiveTab(activeTab === tab ? '' : tab)}
          >
            {tab}
            <span>{activeTab === tab ? '−' : '+'}</span>
          </button>
          {activeTab === tab && (
            <div className={styles.accordionContent}>
              {renderTabContent(tab)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default memo(AboutWindow);
