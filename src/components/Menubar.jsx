import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDesktop } from '../context/DesktopContext';
import { Settings as GearIcon } from 'lucide-react';
import { WINDOW_DEFS } from './Dock';
import styles from '../styles/Menubar.module.css';

const ACCENT_COLORS_VIS = [
  { key: 'orange', color: '#D4541A' },
  { key: 'green', color: '#4A7C59' },
  { key: 'blue', color: '#3B6EA5' },
  { key: 'purple', color: '#7C5C9E' },
];

export default function Menubar() {
  const {
    toggleTheme, setAccentColor, accentColor, theme,
    closeWindow, minimizeWindow, getFocusedWindowId,
    openWindow, updateWindowPosition, windows
  } = useDesktop();
  const [openMenu, setOpenMenu] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [clock, setClock] = useState('');
  const [brightness, setBrightness] = useState(100);
  const menuRef = useRef(null);
  const settingsRef = useRef(null);

  // Clock — format: "Fri 10 Apr 04:04 CET"
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const dayName = days[now.getDay()];
      const date = now.getDate();
      const month = months[now.getMonth()];
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      // Try to get timezone abbreviation
      let tz = '';
      try {
        tz = now.toLocaleTimeString('en-US', { timeZoneName: 'short' }).split(' ').pop();
      } catch (e) {
        tz = 'UTC';
      }
      setClock(`${dayName} ${date} ${month} ${hours}:${minutes} ${tz}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setShowSettings(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleMenuClick = useCallback((menu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
    setShowSettings(false);
  }, []);

  const handleAction = useCallback((action) => {
    setOpenMenu(null);
    action();
  }, []);

  const handleGearClick = useCallback(() => {
    setShowSettings((prev) => !prev);
    setOpenMenu(null);
  }, []);

  return (
    <div className={styles.menubar} ref={menuRef}>
      <div className={styles.left}>
        {/* W Logo */}
        <div className={styles.logoIcon} onClick={() => handleMenuClick('portfolio')}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect width="22" height="22" rx="0" fill="#6B3410" />
            <text x="11" y="16" textAnchor="middle" fill="white" fontSize="13" fontWeight="700" fontFamily="var(--font-ui)">V</text>
          </svg>
        </div>

        {/* Portfolio Menu */}
        <div
          className={`${styles.menuItem} ${openMenu === 'portfolio' ? styles.menuItemActive : ''}`}
          onClick={() => handleMenuClick('portfolio')}
        >
          Portfolio
          <AnimatePresence>
            {openMenu === 'portfolio' && (
              <motion.div
                className={styles.dropdown}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.dropdownItem} onClick={() => handleAction(() => openWindow('about', WINDOW_DEFS.about))}>
                  <span>About Portfolio</span>
                  <span className={styles.shortcut}>Ctrl+Alt+A</span>
                </div>
                <div className={styles.dropdownItem} onClick={() => handleAction(() => openWindow('contact', WINDOW_DEFS.contact))}>
                  <span>Contact Wes</span>
                  <span className={styles.shortcut}>Ctrl+Alt+K</span>
                </div>
                <div className={styles.dropdownItem} onClick={() => handleAction(() => openWindow('help', WINDOW_DEFS.help))}>
                  <span>Open Guide</span>
                  <span className={styles.shortcut}>Ctrl+Alt+H</span>
                </div>
                <div className={styles.dropdownDivider} />
                <div className={styles.dropdownItem} onClick={() => handleAction(() => openWindow('settings', WINDOW_DEFS.settings))}>
                  <span>Settings...</span>
                </div>
                <div className={styles.dropdownDivider} />
                <div className={styles.dropdownItem} onClick={() => handleAction(() => {
                  sessionStorage.clear();
                  localStorage.clear();
                  window.location.reload();
                })}>
                  <span>Reset System</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* File Menu */}
        <div
          className={`${styles.menuItem} ${styles.fileMenu} ${openMenu === 'file' ? styles.menuItemActive : ''}`}
          onClick={() => handleMenuClick('file')}
        >
          File
          <AnimatePresence>
            {openMenu === 'file' && (
              <motion.div
                className={styles.dropdown}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.dropdownItem} onClick={() => handleAction(() => {})}>
                  <span>New Window</span>
                  <span className={styles.shortcut}>Ctrl+Alt+N</span>
                </div>
                <div className={styles.dropdownDivider} />
                <div
                  className={styles.dropdownItem}
                  onClick={() => handleAction(() => {
                    const fid = getFocusedWindowId();
                    if (fid) closeWindow(fid);
                  })}
                >
                  <span>Close Window</span>
                  <span className={styles.shortcut}>Ctrl+Alt+W</span>
                </div>
                <div
                  className={styles.dropdownItem}
                  onClick={() => handleAction(() => {
                    const fid = getFocusedWindowId();
                    if (fid) minimizeWindow(fid);
                  })}
                >
                  <span>Minimize</span>
                  <span className={styles.shortcut}>Ctrl+Alt+M</span>
                </div>
                <div className={styles.dropdownDivider} />
                <div
                  className={styles.dropdownItem}
                  onClick={() => handleAction(() => {
                    alert("You can't quit this portfolio. It's eternal. 🔒");
                  })}
                >
                  <span>Quit</span>
                  <span className={styles.shortcut}>Ctrl+Q</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* View Menu */}
        <div
          className={`${styles.menuItem} ${openMenu === 'view' ? styles.menuItemActive : ''}`}
          onClick={() => handleMenuClick('view')}
        >
          View
          <AnimatePresence>
            {openMenu === 'view' && (
              <motion.div
                className={styles.dropdown}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.dropdownItem} onClick={() => handleAction(() => {
                  const fid = getFocusedWindowId();
                  if (fid && WINDOW_DEFS[fid]) {
                    closeWindow(fid);
                    setTimeout(() => openWindow(fid, WINDOW_DEFS[fid]), 50);
                  }
                })}>
                  <span>Refresh</span>
                  <span className={styles.shortcut}>Ctrl+Alt+R</span>
                </div>
                <div className={styles.dropdownItem} onClick={() => handleAction(() => {})}>
                  <span>Maximize</span>
                  <span className={styles.shortcut}>Ctrl+Alt+F</span>
                </div>
                <div className={styles.dropdownItem} onClick={() => handleAction(() => {
                  const fid = getFocusedWindowId();
                  if (fid) minimizeWindow(fid);
                })}>
                  <span>Minimize</span>
                  <span className={styles.shortcut}>Ctrl+Alt+M</span>
                </div>
                <div className={styles.dropdownItem} onClick={() => handleAction(() => {
                  const fid = getFocusedWindowId();
                  if (fid) closeWindow(fid);
                })}>
                  <span>Close</span>
                  <span className={styles.shortcut}>Ctrl+Alt+W</span>
                </div>
                <div className={styles.dropdownDivider} />
                <div className={styles.dropdownItem} onClick={() => handleAction(() => {
                  const fid = getFocusedWindowId();
                  if (fid) {
                    const win = windows.find((w) => w.id === fid);
                    if (win) {
                      const desktopEl = document.getElementById('desktop-canvas');
                      if (desktopEl) {
                        const rect = desktopEl.getBoundingClientRect();
                        const x = Math.max(0, (rect.width - (win.size?.width || 600)) / 2);
                        const y = Math.max(0, (rect.height - (win.size?.height || 400)) / 2);
                        updateWindowPosition(fid, { x, y });
                      }
                    }
                  }
                })}>
                  <span>Center Window</span>
                  <span className={styles.shortcut}>Ctrl+Alt+C</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className={styles.right}>
        {/* Gear / Quick Settings */}
        <div
          ref={settingsRef}
          className={`${styles.gearBtn} ${showSettings ? styles.gearBtnActive : ''}`}
          onClick={handleGearClick}
        >
          <GearIcon size={14} color="currentColor" strokeWidth={2} />
          <AnimatePresence>
            {showSettings && (
              <motion.div
                className={styles.settingsPanel}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.panelLabel}>Display</div>
                <div style={{ fontSize: 12, color: 'var(--text-primary)', marginBottom: 2 }}>Brightness</div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={brightness}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setBrightness(val);
                    document.documentElement.style.filter = val < 100 ? `brightness(${val / 100})` : '';
                  }}
                  className={styles.brightnessSlider}
                />
                <div className={styles.brightnessLabels}>
                  <span>Dim</span>
                  <span>{brightness}%</span>
                  <span>Bright</span>
                </div>

                <div style={{ fontSize: 12, color: 'var(--text-primary)', marginBottom: 6 }}>Theme color</div>
                <div className={styles.panelColorRow}>
                  {ACCENT_COLORS_VIS.map((c) => (
                    <div
                      key={c.key}
                      className={`${styles.panelSwatch} ${accentColor === c.key ? styles.panelSwatchActive : ''}`}
                      style={{ background: c.color }}
                      onClick={() => setAccentColor(c.key)}
                    />
                  ))}
                </div>

                <div className={styles.panelToggleRow}>
                  <span>Switch to dark mode</span>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className={styles.toggleLabel}>{theme === 'dark' ? 'ON' : 'OFF'}</span>
                    <button
                      className={`${styles.panelToggle} ${theme === 'dark' ? styles.panelToggleOn : ''}`}
                      onClick={toggleTheme}
                    >
                      <div className={styles.panelToggleKnob} />
                    </button>
                  </div>
                </div>

                <div
                  className={styles.panelLink}
                  onClick={() => {
                    setShowSettings(false);
                    openWindow('settings', WINDOW_DEFS.settings);
                  }}
                >
                  Open settings..
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <span className={styles.clock}>{clock}</span>
      </div>
    </div>
  );
}
