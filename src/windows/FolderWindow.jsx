import React, { memo } from 'react';
import { useDesktop } from '../context/DesktopContext';
import { PHOTO_FOLDERS } from '../data/photos';
import { FileText } from 'lucide-react';
import styles from '../styles/Folder.module.css';

function FolderWindow({ meta }) {
  const { openWindow } = useDesktop();
  const folderKey = meta?.folderKey || 'india';
  const folder = PHOTO_FOLDERS[folderKey];

  if (!folder) {
    return (
      <div style={{ padding: 24, color: 'var(--text-muted)' }}>
        Folder not found: {folderKey}
      </div>
    );
  }

  const items = folder.items;

  const handleItemClick = (item) => {
    if (item.type === 'IMAGE') {
      openWindow(`imageviewer-${item.id}`, {
        title: item.name,
        component: 'imageviewer',
        defaultSize: { width: 440, height: 600 },
        minWidth: 320, minHeight: 400,
        icon: '🖼️',
        meta: { name: item.name, srcUrl: item.srcUrl, size: item.size },
      });
    } else if (item.type === 'TEXT') {
      openWindow(`text-${item.id}`, {
        title: `${item.name} — TextEdit`,
        component: 'textviewer',
        defaultSize: { width: 420, height: 320 },
        minWidth: 320, minHeight: 240,
        icon: '📄',
        meta: { name: item.name, content: item.content },
      });
    }
  };

  return (
    <div className={styles.folder}>
      <div className={styles.tableHeader}>
        <span>Folder Contents</span>
        <span>{items.length} items</span>
      </div>

      <div className={styles.list}>
        {items.map((item) => (
          <div 
            key={item.id} 
            className={styles.listItem}
            onClick={() => handleItemClick(item)}
          >
            <div className={styles.iconWrapper}>
              {item.type === 'TEXT' ? (
                <FileText size={16} className={styles.iconText} />
              ) : (
                <div 
                  className={styles.iconImage} 
                  style={{ backgroundImage: `url('${item.srcUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                />
              )}
            </div>
            <div className={styles.itemName}>
              {item.name}
            </div>
            <div className={styles.itemType}>
              {item.type}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(FolderWindow);
