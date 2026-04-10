import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useDesktop } from '../context/DesktopContext';
import {
  User, Columns2, Mail, List, Layers,
  Search, Settings, TerminalSquare, AppWindow,
} from 'lucide-react';
import styles from '../styles/Dock.module.css';

const DOCK_ITEMS = [
  { id: 'about', label: 'About', icon: User, color: '#8B3510' },
  { id: 'experience', label: 'Experience', icon: List, color: '#7C5C9E' },
  { id: 'works', label: 'Projects', icon: Columns2, color: '#8B3510' },
  { id: 'blog', label: 'Blog', icon: Layers, color: '#4A7C59' },
  { id: 'contact', label: 'Contact', icon: Mail, color: '#6B3410' },
  { id: 'search', label: 'Search', icon: Search, color: '#7C5C9E' },
  { id: 'settings', label: 'Settings', icon: Settings, color: '#D4541A' },
  { id: 'terminal', label: 'Terminal', icon: TerminalSquare, color: '#4A7C59' },
  { id: 'help', label: 'Help', icon: AppWindow, color: '#3B6EA5' },
];

const WINDOW_DEFS = {
  about: { title: 'About Varun', component: 'about', defaultSize: { width: 880, height: 680 }, minWidth: 500, minHeight: 400, icon: '👤' },
  experience: { title: 'Experience', component: 'experience', defaultSize: { width: 800, height: 640 }, minWidth: 500, minHeight: 400, icon: '💼' },
  works: { title: 'Projects', component: 'works', defaultSize: { width: 920, height: 680 }, minWidth: 540, minHeight: 400, icon: '📁' },
  blog: { title: 'Blog', component: 'blog', defaultSize: { width: 860, height: 640 }, minWidth: 480, minHeight: 400, icon: '📝' },
  contact: { title: 'Contact', component: 'contact', defaultSize: { width: 640, height: 540 }, minWidth: 400, minHeight: 400, icon: '✉️' },
  search: { title: 'Search', component: 'search', defaultSize: { width: 460, height: 180 }, minWidth: 320, minHeight: 160, icon: '🔍' },
  settings: { title: 'Settings', component: 'settings', defaultSize: { width: 760, height: 640 }, minWidth: 500, minHeight: 440, icon: '⚙️' },
  terminal: { title: 'Terminal — guest@portfolio', component: 'terminal', defaultSize: { width: 780, height: 540 }, minWidth: 500, minHeight: 360, icon: '🖥️' },
  help: { title: 'Help', component: 'help', defaultSize: { width: 680, height: 560 }, minWidth: 440, minHeight: 380, icon: '❓' },
  folder: { title: 'Folder', component: 'folder', defaultSize: { width: 440, height: 500 }, minWidth: 320, minHeight: 300, icon: '📂' },
};

export { WINDOW_DEFS };

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
}

export default function Dock() {
  const { openWindow, windows } = useDesktop();
  const mouseX = useMotionValue(-1000);
  const dockRef = useRef(null);
  const isMobile = useIsMobile();

  const handleMouseMove = useCallback((e) => {
    if (dockRef.current && !isMobile) {
      const rect = dockRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
    }
  }, [mouseX, isMobile]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(-1000);
  }, [mouseX]);

  const handleIconClick = useCallback((id) => {
    openWindow(id, WINDOW_DEFS[id]);
    if (id !== 'search') {
      window.history.pushState(null, '', `/${id}`);
    }
  }, [openWindow]);

  return (
    <motion.div
      ref={dockRef}
      className={styles.dock}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
    >
      {DOCK_ITEMS.map((item) => (
        <DockIcon
          key={item.id}
          item={item}
          mouseX={mouseX}
          isMobile={isMobile}
          isActive={windows.some((w) => w.id === item.id && w.isOpen)}
          onClick={() => handleIconClick(item.id)}
        />
      ))}
    </motion.div>
  );
}

function DockIcon({ item, mouseX, isMobile, isActive, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [bouncing, setBouncing] = useState(false);
  const iconRef = useRef(null);

  const distance = useTransform(mouseX, (val) => {
    if (!iconRef.current || isMobile) return 200;
    const rect = iconRef.current.getBoundingClientRect();
    const parentRect = iconRef.current.parentElement?.getBoundingClientRect();
    if (!parentRect) return 200;
    const iconCenterX = rect.left + rect.width / 2 - parentRect.left;
    return Math.abs(val - iconCenterX);
  });

  const scaleVal = useTransform(distance, [0, 50, 100], isMobile ? [1, 1, 1] : [1.6, 1.25, 1.0]);
  const scale = useSpring(scaleVal, { stiffness: 300, damping: 25 });

  const handleClick = () => {
    if (!isMobile) setBouncing(true);
    onClick();
    if (!isMobile) setTimeout(() => setBouncing(false), 500);
  };

  const Icon = item.icon;

  return (
    <div
      ref={iconRef}
      className={styles.iconWrapper}
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      <AnimatePresence>
        {hovered && !isMobile && (
          <motion.div
            className={styles.tooltip}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
          >
            {item.label}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className={styles.iconBox}
        style={{ background: 'var(--accent)', scale: isMobile ? 1 : scale }}
        animate={bouncing ? { y: [0, -14, 0, -7, 0] } : { y: 0 }}
        transition={bouncing ? { duration: 0.5 } : {}}
      >
        <Icon size={22} />
      </motion.div>
      {isActive ? <div className={styles.activeDot} /> : <div className={styles.inactiveDot} />}
    </div>
  );
}
