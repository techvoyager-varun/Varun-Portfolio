import React, { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDesktop } from '../context/DesktopContext';
import DesktopIconComp, { DESKTOP_ICONS } from './DesktopIcon';
import WindowManager from './WindowManager';
import { WINDOW_DEFS } from './Dock';
import { getWallpaperStyle, shouldShowDog } from '../data/wallpapers';
import styles from '../styles/Desktop.module.css';

/* Pixel-art Dog (standing dog, side profile) */
function PixelDog() {
  const pixelSize = 10;
  const grid = [
    "                  DDD                         ",
    "                 DDDDD                        ",
    "                DDDDDD                        ",
    "               DDDDDDD                        ",
    "              DDDDDDDD                        ",
    "             DDDDDDDDD                        ",
    "            DDDDDDDDDDDD                      ",
    "           DDLLLDDDDDDDDD                     ",
    "          DDLL  LDDDDDDDDL                    ",
    "          DLL   LDDDDDDDDL                    ",
    "          DLL   LDDDDDDDDDL                   ",
    "          DLLL LLDDDDDDDDDL                   ",
    "           DLLLLDDDDDDDDDDL                   ",
    "            DDDDDDDDDDDDDL                    ",
    "            DDDDDDDDDDDDDDLLL                 ",
    "           DDDDDDDDDDDDDDDDDDDDD              ",
    "          DDDDDDDDDDDDDDDDDDDDDDDD            ",
    "         DDDDDDDDDDDDDDDDDDDDDDDDDDD          ",
    "        DDDDDDDDDDDDDDDDDDDDDDDDDDDDD         ",
    "       DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD        ",
    "      DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD       ",
    "      LDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDL      ",
    "      LDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDL     ",
    "      LDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDL    ",
    "       LDDDD   LDDDDDDDDDDDDDDDDDL  DDDDDL    ",
    "       LDDDD    LDDDDDDDDDDDDDDDL   DDDDDL    ",
    "       LDDDD    LDDDDDDDDDDDDDDDL    DDDDL    ",
    "       LDDDD    LDDDDDDDDDDDDDDL     DDDDL    ",
    "        LDDD     LDDDDDDDDDDDDL      DDDL     ",
    "        LDDD     LDDDDDDDDDDDL       DDDL     ",
    "        LLDD      LDDDDDDDDL        DDDL      ",
    "         LLD       LL    LL        LDDLL       ",
    "          LL        L    L        LDDL         ",
    "          LL        L    L       LDDL          ",
    "          LL       LL    LL     LDDL           ",
    "         LLLL     LLLL  LLLL  LLLLL            ",
  ];

  return (
    <svg className={styles.wallpaperDog} viewBox={`0 0 ${46 * pixelSize} ${grid.length * pixelSize}`}>
      {grid.map((row, y) =>
        [...row].map((ch, x) => {
          if (ch === ' ') return null;
          let fill;
          if (ch === 'D') fill = 'rgba(120,50,10,0.7)';
          else if (ch === 'L') fill = 'rgba(160,80,30,0.5)';
          else fill = 'rgba(80,30,5,0.8)';
          return (
            <rect
              key={`${x}-${y}`}
              x={x * pixelSize}
              y={y * pixelSize}
              width={pixelSize}
              height={pixelSize}
              fill={fill}
            />
          );
        })
      )}
    </svg>
  );
}

export default function Desktop({ initialWindow }) {
  const { openWindow, wallpaper, theme } = useDesktop();

  const wallpaperStyle = getWallpaperStyle(wallpaper, theme);
  const showDog = shouldShowDog(wallpaper);

  // Auto-open initial window from route
  useEffect(() => {
    if (initialWindow && WINDOW_DEFS[initialWindow]) {
      openWindow(initialWindow, WINDOW_DEFS[initialWindow]);
    }
  }, [initialWindow]); // eslint-disable-line react-hooks/exhaustive-deps

  // Welcome window after 900ms
  useEffect(() => {
    const shown = sessionStorage.getItem('portfolio-welcome-shown');
    if (shown) return;
    const timer = setTimeout(() => {
      openWindow('welcome', {
        title: 'Welcome',
        component: 'welcome',
        defaultSize: { width: 360, height: 200 },
        minWidth: 360,
        minHeight: 200,
        icon: '👋',
        noResize: true,
        position: {
          x: Math.max(100, (window.innerWidth - 360) / 2 - 40),
          y: Math.max(60, (window.innerHeight - 200) / 2 - 80),
        },
      });
      sessionStorage.setItem('portfolio-welcome-shown', 'true');
    }, 900);
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleIconOpen = useCallback((icon) => {
    let id = icon.target;
    if (icon.target === 'imageviewer') id = `imageviewer-${icon.id}`;
    if (icon.target === 'folder') id = `folder-${icon.id}`;
    
    openWindow(id, {
      ...icon.windowDef,
      component: icon.target,
    });
  }, [openWindow]);

  return (
    <motion.div
      id="desktop-canvas"
      className={styles.desktop}
      style={wallpaperStyle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {showDog && <PixelDog />}

      <div className={styles.desktopIcons}>
        {DESKTOP_ICONS.map((icon, index) => (
          <DesktopIconComp
            key={icon.id}
            icon={icon}
            index={index}
            onOpen={handleIconOpen}
          />
        ))}
      </div>

      <WindowManager />
    </motion.div>
  );
}
