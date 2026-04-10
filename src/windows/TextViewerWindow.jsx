import React, { memo } from 'react';
import { ABOUT_TEXT } from '../data/terminalCommands';

function TextViewerWindow() {
  return (
    <div style={{
      height: '100%',
      background: '#FAFAF6',
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      padding: 20,
      color: '#2A2A20',
      lineHeight: 1.7,
      whiteSpace: 'pre-wrap',
      overflowY: 'auto',
    }}>
      {ABOUT_TEXT}
    </div>
  );
}

export default memo(TextViewerWindow);
