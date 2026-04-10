import React, { memo } from 'react';
import { useDesktop } from '../context/DesktopContext';

function WelcomeWindow() {
  const { closeWindow } = useDesktop();

  return (
    <div style={{
      padding: '24px 28px', textAlign: 'center',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', height: '100%',
    }}>
      <div style={{ fontSize: 28, marginBottom: 8 }}>👋</div>
      <h1 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>
        Welcome to Portfolio OS
      </h1>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 16 }}>
        Click any app in the dock to get started.<br />
        Type &apos;help&apos; in the Terminal for commands.
      </p>
      <button
        onClick={() => closeWindow('welcome')}
        style={{
          padding: '8px 20px', border: '1px solid var(--border)',
          borderRadius: 0, background: 'transparent',
          fontFamily: 'var(--font-ui)', fontSize: 13,
          cursor: 'pointer', color: 'var(--text-primary)',
          transition: 'background 0.15s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--border-light)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
      >
        Dismiss
      </button>
    </div>
  );
}

export default memo(WelcomeWindow);
