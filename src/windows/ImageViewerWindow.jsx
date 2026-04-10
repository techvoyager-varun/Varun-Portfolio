import React, { useState, memo } from 'react';

function ImageViewerWindow({ windowData }) {
  const meta = windowData?.meta || {};
  const name = meta.name || 'photo.jpg';
  const srcUrl = meta.srcUrl;
  const size = meta.size || 'Unknown size';
  
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0a0a0a' }}>
      {/* Image area */}
      <div style={{
        flex: 1, minHeight: 280,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16, position: 'relative', overflow: 'hidden'
      }}>
        {!loaded && srcUrl && (
          <div style={{ position: 'absolute', color: 'rgba(255,255,255,0.4)', fontSize: 13, fontFamily: 'var(--font-mono)' }}>
            Loading image...
          </div>
        )}
        
        {srcUrl ? (
          <img 
            src={srcUrl} 
            alt={name}
            onLoad={() => setLoaded(true)}
            style={{ 
              maxWidth: '100%', 
              maxHeight: '100%', 
              objectFit: 'contain',
              opacity: loaded ? 1 : 0,
              transition: 'opacity 0.2s',
              userSelect: 'none',
              pointerEvents: 'none'
            }} 
          />
        ) : (
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, fontFamily: 'var(--font-mono)' }}>
            No image data found.
          </div>
        )}
      </div>

      {/* Info bar */}
      <div style={{
        padding: '12px 20px', borderTop: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: 16,
        background: 'var(--bg-window)'
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-primary)' }}>
          {name}
        </span>
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
          {size}
        </span>
        <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 'auto' }}>
          2024
        </span>
      </div>
    </div>
  );
}

export default memo(ImageViewerWindow);
