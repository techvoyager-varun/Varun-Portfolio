import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { motion } from 'framer-motion';
import TrafficLights from './TrafficLights';
import { useDesktop } from '../context/DesktopContext';
import styles from '../styles/Window.module.css';

const DESKTOP_MARGIN = 20;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
}

export default function Window({ windowData, children }) {
  const {
    closeWindow,
    minimizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useDesktop();

  const { id, title, isFocused, position, size, zIndex, minWidth, minHeight } = windowData;
  const [isMaximized, setIsMaximized] = useState(false);
  const prevGeometry = useRef({ position, size });
  const isMobile = useIsMobile();

  const handleMaximize = useCallback(() => {
    if (isMaximized) {
      updateWindowPosition(id, prevGeometry.current.position);
      updateWindowSize(id, prevGeometry.current.size);
      setIsMaximized(false);
    } else {
      prevGeometry.current = { position, size };
      const desktopEl = document.getElementById('desktop-canvas');
      if (desktopEl) {
        const rect = desktopEl.getBoundingClientRect();
        updateWindowPosition(id, { x: DESKTOP_MARGIN, y: DESKTOP_MARGIN });
        updateWindowSize(id, {
          width: rect.width - DESKTOP_MARGIN * 2,
          height: rect.height - DESKTOP_MARGIN * 2,
        });
      }
      setIsMaximized(true);
    }
  }, [id, isMaximized, position, size, updateWindowPosition, updateWindowSize]);

  const containerClass = `${styles.windowContainer} ${!isFocused ? styles.windowContainerInactive : ''}`;
  const titlebarClass = `${styles.titlebar} ${!isFocused ? styles.titlebarInactive : ''}`;
  const titleClass = `${styles.titleText} ${!isFocused ? styles.titleTextInactive : ''}`;

  const isRefreshing = useDesktop().refreshingWindows?.[id];

  const handleRefresh = useCallback(() => {
    useDesktop().triggerRefresh(id);
  }, [id, useDesktop]);

  const windowContent = (
    <motion.div
      className={containerClass}
      initial={{ opacity: 0, scale: 0.92, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 8 }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      style={{ width: '100%', height: '100%' }}
    >
      <div
        className={`${titlebarClass} ${!isMobile ? 'window-titlebar-drag' : ''}`}
        onDoubleClick={!isMobile ? handleMaximize : undefined}
      >
        <div className={styles.titleLeft}>
          <span className={titleClass}>{title}</span>
        </div>
        <div className={styles.titleRight}>
          <TrafficLights
            onClose={() => closeWindow(id)}
            onMinimize={() => minimizeWindow(id)}
            onMaximize={handleMaximize}
            onRefresh={() => useDesktop().triggerRefresh(id)}
          />
        </div>
      </div>
      <div className={styles.windowBody}>
        {isRefreshing ? (
          <div style={{ padding: '24px 28px' }}>
            <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '16px', textTransform: 'uppercase' }}>
              Loading Content
            </div>
            <div style={{ width: '45%', height: '10px', background: 'var(--border)', marginBottom: '8px', borderRadius: '0', animation: 'pulse-sk 1.5s infinite ease-in-out' }} />
            <div style={{ width: '68%', height: '10px', background: 'var(--border)', marginBottom: '8px', borderRadius: '0', animation: 'pulse-sk 1.5s infinite ease-in-out' }} />
            <div style={{ width: '55%', height: '10px', background: 'var(--border)', marginBottom: '32px', borderRadius: '0', animation: 'pulse-sk 1.5s infinite ease-in-out' }} />
            <div style={{ width: '100%', height: '120px', background: 'var(--border)', opacity: 0.5, border: '1px solid var(--border)', borderRadius: '0', animation: 'pulse-sk 1.5s infinite ease-in-out' }} />
            <style>{`@keyframes pulse-sk { 0% {opacity:0.3} 50% {opacity:1} 100% {opacity:0.3} }`}</style>
          </div>
        ) : (
          children
        )}
      </div>
    </motion.div>
  );

  // MOBILE: render fullscreen, no drag/resize
  if (isMobile) {
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 'var(--dock-height)',
          zIndex,
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={() => focusWindow(id)}
      >
        {windowContent}
      </div>
    );
  }

  // DESKTOP: react-rnd drag + resize
  return (
    <Rnd
      position={position}
      size={size}
      minWidth={minWidth || 300}
      minHeight={minHeight || 200}
      dragHandleClassName="window-titlebar-drag"
      bounds="#desktop-canvas"
      style={{ zIndex }}
      onDragStop={(e, d) => {
        updateWindowPosition(id, { x: d.x, y: d.y });
      }}
      onResizeStop={(e, direction, ref, delta, pos) => {
        updateWindowSize(
          id,
          { width: parseInt(ref.style.width), height: parseInt(ref.style.height) },
          pos
        );
      }}
      onMouseDown={() => focusWindow(id)}
      enableResizing={!windowData.noResize}
    >
      {windowContent}
    </Rnd>
  );
}
