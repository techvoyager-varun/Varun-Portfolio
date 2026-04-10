import React, { memo } from 'react';
import { useDesktop } from '../context/DesktopContext';
import { WALLPAPERS, getWallpaperStyle } from '../data/wallpapers';
import styles from '../styles/Settings.module.css';

const ACCENT_OPTIONS = [
  { key: 'orange', color: '#D4541A', label: 'Orange' },
  { key: 'green', color: '#4A7C59', label: 'Green' },
  { key: 'blue', color: '#3B6EA5', label: 'Blue' },
  { key: 'purple', color: '#7C5C9E', label: 'Purple' },
];

function SettingsWindow() {
  const {
    theme, toggleTheme, accentColor, setAccentColor,
    wallpaper, setWallpaper,
  } = useDesktop();

  return (
    <div className={styles.settings}>
      <h1 className={styles.title}>Settings</h1>

      {/* Appearance Section */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Appearance</h2>

        <div className={styles.fieldLabel}>Theme mode</div>
        <div className={styles.themeToggle}>
          <button
            className={`${styles.themeBtn} ${theme === 'light' ? styles.themeBtnActive : ''}`}
            onClick={() => { if (theme !== 'light') toggleTheme(); }}
          >
            Light
          </button>
          <button
            className={`${styles.themeBtn} ${theme === 'dark' ? styles.themeBtnActive : ''}`}
            onClick={() => { if (theme !== 'dark') toggleTheme(); }}
          >
            Dark
          </button>
        </div>

        <div className={styles.fieldLabel}>Theme color</div>
        <div className={styles.colorPills}>
          {ACCENT_OPTIONS.map((c) => (
            <button
              key={c.key}
              className={`${styles.colorPill} ${accentColor === c.key ? styles.colorPillActive : ''}`}
              onClick={() => setAccentColor(c.key)}
            >
              <div className={styles.colorDot} style={{ background: c.color }} />
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Wallpaper Section */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Wallpaper</h2>
        <p className={styles.wallpaperSubtitle}>
          Choose the Taxi (dog) illustration or any indexed desktop photo.
        </p>

        <div className={styles.wallpaperGrid}>
          {WALLPAPERS.map((wp) => (
            <div
              key={wp.key}
              className={`${styles.wallpaperCard} ${wallpaper === wp.key ? styles.wallpaperCardActive : ''}`}
              onClick={() => setWallpaper(wp.key)}
            >
              {wp.useDog ? (
                <div
                  className={styles.wallpaperPlaceholder}
                  style={{ background: 'var(--accent)' }}
                >
                  {/* Small pixel dog silhouette */}
                  <svg width="60" height="40" viewBox="0 0 60 40" opacity="0.5">
                    <ellipse cx="32" cy="20" rx="18" ry="10" fill="rgba(120,50,10,0.6)" />
                    <circle cx="16" cy="14" r="8" fill="rgba(120,50,10,0.6)" />
                    <rect x="22" y="28" width="4" height="10" rx="0" fill="rgba(120,50,10,0.5)" />
                    <rect x="30" y="28" width="4" height="10" rx="0" fill="rgba(120,50,10,0.5)" />
                    <rect x="40" y="28" width="4" height="10" rx="0" fill="rgba(120,50,10,0.5)" />
                    <rect x="48" y="28" width="4" height="10" rx="0" fill="rgba(120,50,10,0.5)" />
                  </svg>
                </div>
              ) : (
                <div
                  className={styles.wallpaperPlaceholder}
                  style={{ ...getWallpaperStyle(wp.key, theme) }}
                />
              )}
              <div className={styles.wallpaperLabel}>{wp.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(SettingsWindow);
