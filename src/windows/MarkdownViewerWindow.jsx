import React, { memo } from 'react';

function MarkdownViewerWindow() {
  return (
    <div style={{
      height: '100%', padding: '24px 28px',
      overflowY: 'auto', fontFamily: 'var(--font-ui)',
      color: 'var(--text-primary)',
    }}>
      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>
        v1.0.0 — Initial Release
      </h2>
      <ul style={{ paddingLeft: 20, marginBottom: 20, lineHeight: 1.7, fontSize: 13, color: 'var(--text-secondary)' }}>
        <li>Built desktop OS UI with React and Framer Motion</li>
        <li>Added 9 app windows: About, Works, Blog, Contact, Experience, Search, Settings, Terminal, Help</li>
        <li>Implemented magnifying dock with spring animations</li>
        <li>Created terminal with 15+ working commands</li>
        <li>Added dark mode and accent color themes</li>
        <li>Keyboard shortcuts for power users</li>
      </ul>

      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>
        v0.9.0 — Beta
      </h2>
      <ul style={{ paddingLeft: 20, marginBottom: 20, lineHeight: 1.7, fontSize: 13, color: 'var(--text-secondary)' }}>
        <li>Window manager with z-index stacking</li>
        <li>Draggable, resizable windows via react-rnd</li>
        <li>Boot screen with progress animation</li>
        <li>Desktop icons with double-click open</li>
      </ul>

      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>
        v0.8.0 — Alpha
      </h2>
      <ul style={{ paddingLeft: 20, marginBottom: 20, lineHeight: 1.7, fontSize: 13, color: 'var(--text-secondary)' }}>
        <li>Initial layout: menubar, desktop, dock</li>
        <li>Context-based state management</li>
        <li>Routing with React Router DOM</li>
        <li>CSS Modules design system</li>
      </ul>
    </div>
  );
}

export default memo(MarkdownViewerWindow);
