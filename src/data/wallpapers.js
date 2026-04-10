import { PHOTO_FOLDERS } from './photos';

// Base wallpapers like the Dog Illustration
const BASE_WALLPAPERS = [
  {
    key: 'dog',
    label: 'Taxi (dog) Illustration',
    group: 'default',
    srcUrl: null,
    useDog: true,
  },
  {
    key: 'assianian',
    label: 'Assianian Landscape',
    group: 'default',
    srcUrl: '/assianian.jpg',
    useDog: false,
  },
];

// Dynamically generate photo wallpapers from the folders data
const photoWallpapers = Object.values(PHOTO_FOLDERS).flatMap((folder) => {
  return folder.items
    .filter((item) => item.type === 'IMAGE')
    .map((img) => ({
      key: img.id,
      label: `${folder.label} · ${img.name}`,
      group: folder.label,
      srcUrl: img.srcUrl,
      useDog: false,
    }));
});

export const WALLPAPERS = [...BASE_WALLPAPERS, ...photoWallpapers];

// Get the background style for a wallpaper key
export function getWallpaperStyle(key, theme) {
  const wp = WALLPAPERS.find((w) => w.key === key);
  if (!wp || wp.useDog) {
    if (theme === 'dark') {
      return { background: '#1A1714' };
    }
    return { background: `var(--accent)` };
  }
  // Photo wallpaper: use image URL
  return { 
    backgroundImage: `url('${wp.srcUrl}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };
}

// Check if wallpaper should show the pixel dog
export function shouldShowDog(key) {
  const wp = WALLPAPERS.find((w) => w.key === key);
  return !wp || wp.useDog;
}
