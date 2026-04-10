import React, { memo } from 'react';
import styles from '../styles/Help.module.css';

function HelpWindow() {
  return (
    <div className={styles.help}>
      <h1 className={styles.guideTitle}>Portfolio Guide</h1>
      <p className={styles.intro}>
        This site is a desktop-style portfolio. Open apps in draggable windows, browse files and folders, 
        use intelligent search, and control everything through CLI commands in Terminal.
      </p>

      <section className={styles.section}>
        <h2 className={styles.sectionHeader}>How To Open Apps</h2>
        <ul className={styles.bulletList}>
          <li>Click app icons in the bottom app bar to open or focus a window.</li>
          <li>Use Search to type what you want and let the site open matching windows for you.</li>
          <li>Use Terminal with commands like open and close for command-line control.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionHeader}>Intelligent Search</h2>
        <p className={styles.text}>
          Search is intelligent and responds to direct commands. Use it to quickly open or close apps, projects, and folders.
        </p>
        <p className={styles.tryText}>
          Try: <span className={styles.command}>open contact</span> | <span className={styles.command}>open India</span> | <span className={styles.command}>close experience</span> | <span className={styles.command}>close all</span>
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionHeader}>CLI Quick Start</h2>
        <p className={styles.text}>
          Open the Terminal app and run commands. Good starters:
        </p>
        <div className={styles.codeBlock}>
          help apps open &lt;app&gt; close &lt;app&gt; windows man &lt;command&gt;
        </div>
      </section>
    </div>
  );
}

export default memo(HelpWindow);
