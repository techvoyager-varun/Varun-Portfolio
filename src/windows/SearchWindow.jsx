import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CornerDownLeft } from 'lucide-react';
import { useDesktop } from '../context/DesktopContext';
import { WINDOW_DEFS } from '../components/Dock';
import { getSearchIndex } from '../data/terminalCommands';
import styles from '../styles/Search.module.css';

const searchIndex = getSearchIndex();

function SearchWindow() {
  const { openWindow, closeWindow, closeAllWindows, windows } = useDesktop();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const getResults = (q) => {
    if (!q.trim()) return [];
    return searchIndex.filter((item) =>
      item.title.toLowerCase().includes(q.toLowerCase()) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(q.toLowerCase()))
    );
  };

  const results = getResults(query);

  const executeAction = useCallback((q) => {
    const cleanQ = q.trim().toLowerCase();
    
    // Command: Close all
    if (cleanQ === 'close all' || cleanQ === 'close all tabs' || cleanQ === 'close all windows' || cleanQ === 'clear desktop') {
      closeAllWindows();
      closeWindow('search');
      return true;
    }

    // Command: Close specific
    if (cleanQ.startsWith('close ')) {
      const target = cleanQ.replace('close ', '');
      const win = windows.find(w => w.title.toLowerCase().includes(target) || w.id.toLowerCase().includes(target));
      if (win) {
        closeWindow(win.id);
        setQuery('');
        return true;
      }
    }

    // Command: Open
    if (cleanQ.startsWith('open ')) {
      const target = cleanQ.replace('open ', '');
      const match = searchIndex.find(item => item.title.toLowerCase().includes(target));
      if (match && WINDOW_DEFS[match.id]) {
        openWindow(match.id, {
          ...WINDOW_DEFS[match.id],
          meta: match.folderKey ? { folderKey: match.folderKey } : match.meta
        });
        closeWindow('search');
        return true;
      }
    }

    // Fallback: Use selected result
    if (results.length > 0) {
      const selected = results[selectedIndex] || results[0];
      if (selected && WINDOW_DEFS[selected.id]) {
        openWindow(selected.id, {
          ...WINDOW_DEFS[selected.id],
          meta: selected.folderKey ? { folderKey: selected.folderKey } : selected.meta
        });
        closeWindow('search');
        return true;
      }
    }

    return false;
  }, [results, selectedIndex, openWindow, closeWindow, closeAllWindows, windows]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      executeAction(query);
    } else if (e.key === 'Escape') {
      closeWindow('search');
    }
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.inputWrapper}>
        <textarea
          ref={inputRef}
          className={styles.inputField}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
          onKeyDown={handleKeyDown}
          placeholder="What do you want to know or to go to? Ask anything or go to anywhere you want"
        />
        <button 
          className={styles.enterButton}
          onClick={() => executeAction(query)}
          title="Press Enter to search or run command"
        >
          <CornerDownLeft className={styles.enterIcon} />
        </button>
      </div>


    </div>
  );
}

export default memo(SearchWindow);
