import React, { memo } from 'react';
import styles from '../styles/Help.module.css';

function HelpWindow() {
  const shortcuts = [
    { keys: ['Ctrl', 'W'], action: 'Close focused window' },
    { keys: ['Ctrl', 'M'], action: 'Minimize focused window' },
    { keys: ['Ctrl', 'K'], action: 'Open Search' },
    { keys: ['Ctrl', 'T'], action: 'Open Terminal' },
    { keys: ['Escape'], action: 'Close Search / focused dialog' },
    { keys: ['↑', '↓'], action: 'Command history (in Terminal)' },
  ];

  return (
    <div className={styles.help}>
      <h1 className={styles.title}>Help & Keyboard Shortcuts</h1>

      <h2 className={styles.sectionLabel}>Keyboard Shortcuts</h2>

      <table className={styles.table}>
        <tbody>
          {shortcuts.map((s, i) => (
            <tr key={i} className={styles.tableRow}>
              <td className={styles.tableCellKeys}>
                {s.keys.map((k, j) => (
                  <React.Fragment key={j}>
                    <span className={styles.keyBadge}>{k}</span>
                    {j < s.keys.length - 1 && <span className={styles.keyPlus}>+</span>}
                  </React.Fragment>
                ))}
              </td>
              <td className={styles.tableCell}>{s.action}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className={styles.sectionLabel}>How to Use</h2>

      <ul className={styles.bulletList}>
        {[
          'Click desktop icons to open files.',
          'Click dock icons to open apps.',
          'Drag windows by their title bar.',
          'Resize from window edges and corners.',
          "Type 'help' in the Terminal for a list of commands.",
        ].map((text, i) => (
          <li key={i} className={styles.bulletItem}>
            <span className={styles.bulletDot} />
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(HelpWindow);
