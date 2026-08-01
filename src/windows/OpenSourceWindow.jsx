import React, { memo } from 'react';
import { openSourceContributions } from '../data/opensource';
import { ExternalLink, GitPullRequest } from 'lucide-react';
import styles from '../styles/About.module.css';

function OpenSourceWindow() {
  return (
    <div className={styles.about}>
      <div className={styles.content} style={{ paddingTop: '24px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
          Open Source Contributions
        </h1>
        <p className={styles.bio} style={{ marginBottom: '20px' }}>
          Active contributor to production open-source software repositories and web applications.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {openSourceContributions.map((org, index) => (
            <div
              key={index}
              style={{
                border: '1px solid var(--border)',
                borderRadius: '0',
                padding: '20px',
                background: 'var(--bg-secondary, rgba(255, 255, 255, 0.02))',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--accent)' }}>
                    {org.organization}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    ({org.repo})
                  </span>
                </div>
                <a
                  href={org.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '12px',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    border: '1px solid var(--border)',
                    padding: '4px 10px',
                    borderRadius: '0',
                    background: 'var(--bg-primary)',
                  }}
                >
                  Repository <ExternalLink size={12} />
                </a>
              </div>

              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.5' }}>
                {org.description}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {org.prs.map((pr, prIdx) => (
                  <div
                    key={prIdx}
                    style={{
                      border: '1px solid var(--border-light, var(--border))',
                      borderRadius: '0',
                      padding: '12px 14px',
                      background: 'var(--bg-primary)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', marginBottom: '6px' }}>
                      <a
                        href={pr.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: '13px',
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          lineHeight: '1.4',
                        }}
                      >
                        <GitPullRequest size={14} style={{ color: '#2da44e', flexShrink: 0 }} />
                        <span>#{pr.prNumber} {pr.title}</span>
                      </a>
                      <a
                        href={pr.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: '11px',
                          color: 'var(--accent)',
                          textDecoration: 'none',
                          whiteSpace: 'nowrap',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px',
                        }}
                      >
                        View PR <ExternalLink size={10} />
                      </a>
                    </div>

                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px', lineHeight: '1.4' }}>
                      {pr.description}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {pr.tags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          style={{
                            fontSize: '10px',
                            padding: '2px 8px',
                            background: 'var(--border-light, rgba(0, 0, 0, 0.05))',
                            border: '1px solid var(--border)',
                            color: 'var(--text-muted)',
                            borderRadius: '0',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(OpenSourceWindow);
