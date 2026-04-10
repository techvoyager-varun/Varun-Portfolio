import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DesktopProvider, useDesktop } from './context/DesktopContext';
import BootScreen from './components/BootScreen';
import Menubar from './components/Menubar';
import Desktop from './components/Desktop';
import Dock from './components/Dock';
import { WINDOW_DEFS } from './components/Dock';
import './styles/global.css';

function DesktopShell({ initialWindow }) {
  const { closeWindow, minimizeWindow, openWindow, getFocusedWindowId } = useDesktop();

  // Global keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      const isCmd = e.metaKey || e.ctrlKey;
      const isAlt = e.altKey;

      if (isCmd && isAlt && e.key === 'w') {
        e.preventDefault();
        const fid = getFocusedWindowId();
        if (fid) closeWindow(fid);
      } else if (isCmd && isAlt && e.key === 'm') {
        e.preventDefault();
        const fid = getFocusedWindowId();
        if (fid) minimizeWindow(fid);
      } else if (isCmd && isAlt && e.key === 'k') {
        e.preventDefault();
        openWindow('contact', WINDOW_DEFS.contact);
      } else if (isCmd && isAlt && e.key === 'a') {
        e.preventDefault();
        openWindow('about', WINDOW_DEFS.about);
      } else if (isCmd && isAlt && e.key === 'h') {
        e.preventDefault();
        openWindow('help', WINDOW_DEFS.help);
      } else if (isCmd && e.key === 'k') {
        e.preventDefault();
        openWindow('search', WINDOW_DEFS.search);
      } else if (isCmd && e.key === 't') {
        e.preventDefault();
        openWindow('terminal', WINDOW_DEFS.terminal);
      } else if (e.key === 'Escape') {
        closeWindow('search');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [closeWindow, minimizeWindow, openWindow, getFocusedWindowId]);

  return (
    <>
      <Menubar />
      <Desktop initialWindow={initialWindow} />
      <Dock />
    </>
  );
}

function AppContent() {
  const [booted, setBooted] = useState(false);

  const handleBootComplete = useCallback(() => {
    setBooted(true);
  }, []);

  return (
    <>
      {!booted && <BootScreen onComplete={handleBootComplete} />}
      {booted && (
        <Routes>
          <Route path="/" element={<DesktopShell />} />
          <Route path="/about" element={<DesktopShell initialWindow="about" />} />
          <Route path="/experience" element={<DesktopShell initialWindow="experience" />} />
          <Route path="/works" element={<DesktopShell initialWindow="works" />} />
          <Route path="/works/:slug" element={<DesktopShell initialWindow="works" />} />
          <Route path="/blog" element={<DesktopShell initialWindow="blog" />} />
          <Route path="/contact" element={<DesktopShell initialWindow="contact" />} />
          <Route path="/terminal" element={<DesktopShell initialWindow="terminal" />} />
          <Route path="/help" element={<DesktopShell initialWindow="help" />} />
          <Route path="/search" element={<DesktopShell initialWindow="search" />} />
          <Route path="/settings" element={<DesktopShell initialWindow="settings" />} />
          <Route path="*" element={<DesktopShell />} />
        </Routes>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <DesktopProvider>
        <AppContent />
      </DesktopProvider>
    </BrowserRouter>
  );
}
