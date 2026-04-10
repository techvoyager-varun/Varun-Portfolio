import React from 'react';

export default function MobileGuard() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'var(--bg-desktop)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px',
      textAlign: 'center',
      fontFamily: 'var(--font-ui)',
      zIndex: 99999,
    }}>
      <div style={{ fontSize: 64, marginBottom: 20 }}>🖥️</div>
      <h1 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>
        Best on Desktop
      </h1>
      <p style={{
        fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 320, marginBottom: 28,
      }}>
        This portfolio is an interactive desktop experience. Open it on a larger screen for the full experience.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {['About', 'Works', 'Contact', 'Blog', 'Experience'].map((item) => (
          <a
            key={item}
            href={`/${item.toLowerCase()}`}
            style={{
              color: 'var(--accent)',
              fontSize: 14,
              textDecoration: 'underline',
              textUnderlineOffset: 2,
            }}
          >
            {item}
          </a>
        ))}
      </div>
      {/* Simple dog SVG */}
      <svg width="80" height="80" viewBox="0 0 80 80" style={{ marginTop: 32, opacity: 0.4 }}>
        <circle cx="40" cy="30" r="16" fill="var(--accent)" opacity="0.7" />
        <ellipse cx="40" cy="55" rx="14" ry="18" fill="var(--accent)" opacity="0.5" />
        <rect x="30" y="68" width="5" height="10" rx="2" fill="var(--accent)" opacity="0.5" />
        <rect x="45" y="68" width="5" height="10" rx="2" fill="var(--accent)" opacity="0.5" />
        <polygon points="26,22 30,12 34,24" fill="var(--accent)" opacity="0.6" />
        <polygon points="46,24 50,12 54,22" fill="var(--accent)" opacity="0.6" />
        <circle cx="35" cy="28" r="2" fill="white" />
        <circle cx="45" cy="28" r="2" fill="white" />
        <ellipse cx="40" cy="33" rx="2" ry="1.5" fill="#333" />
      </svg>
    </div>
  );
}
