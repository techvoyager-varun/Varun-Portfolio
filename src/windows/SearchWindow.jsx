import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDesktop } from '../context/DesktopContext';
import { WINDOW_DEFS } from '../components/Dock';
import { getSearchIndex } from '../data/terminalCommands';
import { Search as SearchIcon } from 'lucide-react';

const searchIndex = getSearchIndex();

function SearchWindow() {
  const { openWindow, closeWindow } = useDesktop();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const results = query.trim()
    ? searchIndex.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase()))
      )
    : searchIndex.slice(0, 12);

  // Group results by type
  const grouped = {};
  results.forEach((r) => {
    const key = r.type === 'page' ? 'Pages' : r.type === 'work' ? 'Works' : 'Blog';
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(r);
  });

  const flatResults = results;

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, flatResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = flatResults[selectedIndex];
      if (selected) {
        const windowId = selected.id;
        if (WINDOW_DEFS[windowId]) {
          openWindow(windowId, WINDOW_DEFS[windowId]);
          closeWindow('search');
        }
      }
    } else if (e.key === 'Escape') {
      closeWindow('search');
    }
  }, [flatResults, selectedIndex, openWindow, closeWindow]);

  const highlightMatch = (text, q) => {
    if (!q.trim()) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <strong style={{ color: 'var(--accent)' }}>{text.slice(idx, idx + q.length)}</strong>
        {text.slice(idx + q.length)}
      </>
    );
  };

  let flatIndex = -1;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Search input */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        height: 48, borderBottom: '1px solid var(--border)',
        padding: '0 20px', flexShrink: 0,
      }}>
        <SearchIcon size={18} color="var(--text-muted)" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
          onKeyDown={handleKeyDown}
          placeholder="Search portfolio..."
          style={{
            flex: 1, height: '100%', border: 'none', background: 'transparent',
            fontSize: 18, fontFamily: 'var(--font-ui)', color: 'var(--text-primary)',
            outline: 'none',
          }}
        />
      </div>

      {/* Results */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <div style={{
              fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
              letterSpacing: '0.08em', color: 'var(--text-muted)',
              marginBottom: 6, marginTop: 8,
            }}>
              {category}
            </div>
            <AnimatePresence>
              {items.map((item) => {
                flatIndex++;
                const idx = flatIndex;
                const isSelected = idx === selectedIndex;
                return (
                  <motion.div
                    key={`${item.type}-${item.id}-${item.title}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    onClick={() => {
                      if (WINDOW_DEFS[item.id]) {
                        openWindow(item.id, WINDOW_DEFS[item.id]);
                        closeWindow('search');
                      }
                    }}
                    style={{
                      height: 40, display: 'flex', alignItems: 'center', gap: 10,
                      padding: '0 10px', borderRadius: 0, cursor: 'pointer',
                      background: isSelected ? 'var(--border-light)' : 'transparent',
                      transition: 'background 0.1s',
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                  >
                    <span style={{ fontSize: 14, color: 'var(--text-primary)' }}>
                      {highlightMatch(item.title, query)}
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 'auto' }}>
                      {item.subtitle}
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ))}
        {results.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 32, fontSize: 14 }}>
            No results found for "{query}"
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(SearchWindow);
