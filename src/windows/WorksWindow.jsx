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
          {selected.link && (
            <button
              className={styles.linkBtn}
              onClick={() => window.open(selected.link, '_blank')}
            >
              <ExternalLink size={14} /> View Project
            </button>
          )}
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
