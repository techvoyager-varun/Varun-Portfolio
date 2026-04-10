import React from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/DesktopIcon.module.css';
import { FileText, File, Mail } from 'lucide-react';

const DESKTOP_ICONS = [
  // Photo folders
  {
    id: 'india',
    label: 'india',
    type: 'folder',
    top: 24,
    left: 16,
    target: 'folder',
    folderKey: 'india',
    windowDef: {
      title: 'india',
      component: 'folder',
      defaultSize: { width: 640, height: 420 },
      minWidth: 400, minHeight: 300,
      icon: '📁',
      meta: { folderKey: 'india' },
    },
  },
  {
    id: 'switzerland',
    label: 'switzerland',
    type: 'folder',
    top: 118,
    left: 16,
    target: 'folder',
    folderKey: 'switzerland',
    windowDef: {
      title: 'switzerland',
      component: 'folder',
      defaultSize: { width: 640, height: 420 },
      minWidth: 400, minHeight: 300,
      icon: '📁',
      meta: { folderKey: 'switzerland' },
    },
  },
  {
    id: 'singapore',
    label: 'singapore',
    type: 'folder',
    top: 212,
    left: 16,
    target: 'folder',
    folderKey: 'singapore',
    windowDef: {
      title: 'singapore',
      component: 'folder',
      defaultSize: { width: 640, height: 420 },
      minWidth: 400, minHeight: 300,
      icon: '📁',
      meta: { folderKey: 'singapore' },
    },
  },
  // Contact
  {
    id: 'contact-icon',
    label: 'Contact',
    type: 'envelope',
    top: 24,
    left: 96,
    target: 'contact',
    windowDef: {
      title: 'Contact',
      component: 'contact',
      defaultSize: { width: 480, height: 460 },
      minWidth: 380, minHeight: 380,
      icon: '✉️',
    },
  },
  // Files
  {
    id: 'about-txt',
    label: 'about.txt',
    type: 'file',
    top: 118,
    left: 96,
    target: 'textviewer',
    windowDef: {
      title: 'about.txt — TextEdit',
      component: 'textviewer',
      defaultSize: { width: 480, height: 360 },
      minWidth: 360, minHeight: 280,
      icon: '📄',
    },
  },
  {
    id: 'build-log',
    label: 'build-log.md',
    type: 'file',
    top: 212,
    left: 96,
    target: 'markdownviewer',
    windowDef: {
      title: 'build-log.md — Markdown Preview',
      component: 'markdownviewer',
      defaultSize: { width: 520, height: 400 },
      minWidth: 400, minHeight: 300,
      icon: '📝',
    },
  },
];

function FolderIconGraphic() {
  return (
    <div className={styles.folderIcon}>
      <div className={styles.folderTab} />
      <div className={styles.folderBody}>
        <div className={styles.folderStripe} />
      </div>
    </div>
  );
}

export default function DesktopIcon({ icon, index, onOpen }) {
  const handleClick = () => onOpen(icon);

  const getIconContent = () => {
    switch (icon.type) {
      case 'folder':
        return (
          <div className={styles.iconGraphic}>
            <FolderIconGraphic />
          </div>
        );
      case 'envelope':
        return (
          <div className={`${styles.iconGraphic} ${styles.envelopeIcon}`}>
            <Mail size={26} color="rgba(255,255,255,0.9)" strokeWidth={1.5} />
          </div>
        );
      case 'file':
      default:
        return (
          <div className={`${styles.iconGraphic} ${styles.fileIcon}`}>
            {icon.label.includes('.md') ? <File size={24} /> : <FileText size={24} />}
          </div>
        );
    }
  };

  return (
    <motion.div
      className={styles.desktopIcon}
      style={{ top: icon.top, left: icon.left, position: 'absolute' }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.04, duration: 0.3, ease: 'easeOut' }}
      onClick={handleClick}
      tabIndex={0}
    >
      {getIconContent()}
      <span className={styles.iconLabel}>
        {icon.label.split('\n').map((line, i) => (
          <React.Fragment key={i}>
            {i > 0 && <br />}
            {line}
          </React.Fragment>
        ))}
      </span>
    </motion.div>
  );
}

export { DESKTOP_ICONS };
