import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';

const ACCENT_MAP = {
  orange: '#D4541A',
  green: '#4A7C59',
  blue: '#3B6EA5',
  purple: '#7C5C9E',
};

const ACCENT_DARK_MAP = {
  orange: '#8B3510',
  green: '#2D4C36',
  blue: '#234468',
  purple: '#4E3A63',
};

const DesktopContext = createContext(null);

export function useDesktop() {
  const ctx = useContext(DesktopContext);
  if (!ctx) throw new Error('useDesktop must be used inside DesktopProvider');
  return ctx;
}

export function DesktopProvider({ children }) {
  const [windows, setWindows] = useState([]);
  const [refreshingWindows, setRefreshingWindows] = useState({});
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'light');
  const [accentColor, setAccentColorState] = useState(() => localStorage.getItem('portfolio-accent') || 'orange');
  const [wallpaper, setWallpaper] = useState(() => localStorage.getItem('portfolio-wallpaper') || 'assianian');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const zCounterRef = useRef(100);

  // Apply theme & accent on mount and when they change //

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', ACCENT_MAP[accentColor] || ACCENT_MAP.orange);
    document.documentElement.style.setProperty('--accent-dark', ACCENT_DARK_MAP[accentColor] || ACCENT_DARK_MAP.orange);
    localStorage.setItem('portfolio-accent', accentColor);
  }, [accentColor]);

  useEffect(() => {
    localStorage.setItem('portfolio-wallpaper', wallpaper);
  }, [wallpaper]);

  const playSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 800;
      osc.type = 'sine';
      gain.gain.value = 0.08;
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) { /* ignore audio errors */ }
  }, [soundEnabled]);

  const focusWindow = useCallback((id) => {
    zCounterRef.current += 1;
    const newZ = zCounterRef.current;
    setWindows((prev) =>
      prev.map((w) => ({
        ...w,
        isFocused: w.id === id,
        zIndex: w.id === id ? newZ : w.zIndex,
      }))
    );
  }, []);

  const openWindow = useCallback((id, windowDef) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.id === id);
      if (existing) {
        if (existing.isMinimized) {
          zCounterRef.current += 1;
          return prev.map((w) => ({
            ...w,
            isMinimized: w.id === id ? false : w.isMinimized,
            isFocused: w.id === id,
            zIndex: w.id === id ? zCounterRef.current : w.zIndex,
          }));
        }
        // Just focus
        zCounterRef.current += 1;
        return prev.map((w) => ({
          ...w,
          isFocused: w.id === id,
          zIndex: w.id === id ? zCounterRef.current : w.zIndex,
        }));
      }
      // Add new window
      if (!windowDef) return prev;
      zCounterRef.current += 1;
      const openCount = prev.filter((w) => w.isOpen).length;
      const newWin = {
        ...windowDef,
        id,
        isOpen: true,
        isMinimized: false,
        isFocused: true,
        zIndex: zCounterRef.current,
        position: windowDef.position || {
          x: 80 + openCount * 24,
          y: 50 + openCount * 24,
        },
        size: windowDef.defaultSize ? { ...windowDef.defaultSize } : { width: 600, height: 400 },
      };
      return [
        ...prev.map((w) => ({ ...w, isFocused: false })),
        newWin,
      ];
    });
    playSound();
  }, [playSound]);

  const closeWindow = useCallback((id) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    playSound();
  }, [playSound]);

  const minimizeWindow = useCallback((id) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true, isFocused: false } : w))
    );
  }, []);

  const restoreWindow = useCallback((id) => {
    zCounterRef.current += 1;
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, isMinimized: false, isFocused: true, zIndex: zCounterRef.current }
          : { ...w, isFocused: false }
      )
    );
  }, []);

  const updateWindowPosition = useCallback((id, position) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, position } : w))
    );
  }, []);

  const updateWindowSize = useCallback((id, size, position) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, size, ...(position ? { position } : {}) } : w
      )
    );
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const setAccentColor = useCallback((color) => {
    setAccentColorState(color);
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => !prev);
  }, []);

  const getFocusedWindowId = useCallback(() => {
    const focused = windows.find((w) => w.isFocused);
    return focused ? focused.id : null;
  }, [windows]);

  const triggerRefresh = useCallback((id) => {
    setRefreshingWindows((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setRefreshingWindows((prev) => ({ ...prev, [id]: false }));
    }, 1200); // skeleton loading time
  }, []);

  const closeAllWindows = useCallback(() => {
    setWindows([]);
    window.history.pushState(null, '', '/');
    playSound();
  }, [playSound]);

  const value = {
    windows,
    refreshingWindows,
    theme,
    accentColor,
    wallpaper,
    soundEnabled,
    openWindow,
    closeWindow,
    closeAllWindows,
    minimizeWindow,
    restoreWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
    toggleTheme,
    setAccentColor,
    setWallpaper,
    toggleSound,
    getFocusedWindowId,
    triggerRefresh,
    ACCENT_MAP,
  };

  return (
    <DesktopContext.Provider value={value}>
      {children}
    </DesktopContext.Provider>
  );
}
