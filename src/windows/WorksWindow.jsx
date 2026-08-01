import React, { useState, useEffect, memo } from 'react';
import { projects } from '../data/projects';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import styles from '../styles/Works.module.css';

function WorksWindow() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selectedId, setSelectedId] = useState(isMobile ? null : (projects[0]?.id || null));

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile && selectedId === null) {
        setSelectedId(projects[0]?.id || null);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedId]);

  const selected = projects.find((p) => p.id === selectedId);

  const renderSidebar = () => (
    <div className={styles.sidebar}>
      <div className={styles.sidebarLabel}>Works</div>
      {projects.map((p) => (
        <div
          key={p.id}
          className={`${styles.projectItem} ${selectedId === p.id ? styles.projectItemSelected : ''}`}
          onClick={() => setSelectedId(p.id)}
        >
          <span>{p.name}</span>
          <span className={styles.typeBadge}>{p.type}</span>
        </div>
      ))}
      <div className={styles.clickHint}>Click on any to know more about them</div>
    </div>
  );

  const renderDetail = () => (
    <div className={styles.detail}>
      {selected ? (
        <>
          {isMobile && (
            <button className={styles.backBtn} onClick={() => setSelectedId(null)} style={{background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '16px', fontSize: '13px', fontFamily: 'var(--font-ui)', padding: 0}}>
              <ArrowLeft size={16} /> Back to Projects
            </button>
          )}
          <div className={styles.projectName}>{selected.name}</div>
          <div className={styles.metaRow}>
            {selected.role}<span>•</span>
            {selected.type}
          </div>
          <div className={styles.tags}>
            {selected.stack.map((t) => (
              <span key={t} className={styles.tag}>{t}</span>
            ))}
          </div>
          <p className={styles.description}>{selected.description}</p>
          {selected.outcomes && selected.outcomes.length > 0 && (
            <>
              <div className={styles.outcomesLabel}>Key Outcomes</div>
              <ul className={styles.outcomesList}>
                {selected.outcomes.map((o, i) => (
                  <li key={i}>{o}</li>
                ))}
              </ul>
            </>
          )}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {selected.link && (
              <button
                className={styles.linkBtn}
                onClick={() => window.open(selected.link, '_blank')}
              >
                <ExternalLink size={14} /> View Live
              </button>
            )}
            {selected.github && (
              <button
                className={styles.linkBtn}
                onClick={() => window.open(selected.github, '_blank')}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z"/></svg> GitHub
              </button>
            )}
          </div>
        </>
      ) : (
        <div className={styles.emptyState}>Select a project from the sidebar.</div>
      )}
    </div>
  );

  return (
    <div className={styles.works}>
      {isMobile ? (
        selectedId ? renderDetail() : renderSidebar()
      ) : (
        <>
          {renderSidebar()}
          {renderDetail()}
        </>
      )}
    </div>
  );
}

export default memo(WorksWindow);
