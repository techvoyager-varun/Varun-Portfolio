import { projects } from './projects';
import { blogPosts } from './blogPosts';
import { PHOTO_FOLDERS } from './photos';
import { openSourceContributions } from './opensource';

export const ABOUT_TEXT = `Based in Alwar, Rajasthan, India, I am a B.Tech Computer Science and Engineering student at The LNM Institute of Information Technology. I have a passion for building robust applications and solving complex algorithmic challenges.
`;

export const BUILD_LOG = `## v1.0.0 — Initial Release
- Built desktop OS UI with React and Framer Motion
- Added 9 app windows: About, Works, Blog, Contact, Experience, Search, Settings, Terminal, Help
- Implemented magnifying dock with spring animations
- Created terminal with 15+ working commands
- Added dark mode and accent color themes
- Keyboard shortcuts for power users

## v0.9.0 — Beta
- Window manager with z-index stacking
- Draggable, resizable windows via react-rnd
- Boot screen with progress animation
- Desktop icons with double-click open

## v0.8.0 — Alpha
- Initial layout: menubar, desktop, dock
- Context-based state management
- Routing with React Router DOM
- CSS Modules design system`;

export const SKILLS = {
  Languages: 'C, C++, Java, JavaScript, Python',
  Frameworks: 'React, Node, Express, MongoDB, Tailwind',
  Tools: 'Git, Bash, Vite, Postman, Vite',
  Other: 'DSA, OOP, OS, DBMS',
};

export function getSearchIndex() {
  const items = [];

  items.push(
    { type: 'page', id: 'about', title: 'About', subtitle: 'Learn about me' },
    { type: 'page', id: 'works', title: 'Works', subtitle: 'Browse projects' },
    { type: 'page', id: 'blog', title: 'Blog', subtitle: 'Read articles' },
    { type: 'page', id: 'contact', title: 'Contact', subtitle: 'Get in touch' },
    { type: 'page', id: 'experience', title: 'Experience', subtitle: 'Career timeline' },
    { type: 'page', id: 'terminal', title: 'Terminal', subtitle: 'Interactive CLI' },
    { type: 'page', id: 'settings', title: 'Settings', subtitle: 'Appearance & preferences' },
    { type: 'page', id: 'help', title: 'Help', subtitle: 'Keyboard shortcuts & guide' }
  );

  projects.forEach((p) => {
    items.push({
      type: 'work',
      id: 'works',
      projectId: p.id,
      title: p.name,
      subtitle: `${p.role} • ${p.type}`,
    });
  });

  blogPosts.forEach((b) => {
    items.push({
      type: 'blog',
      id: 'blog',
      postId: b.id,
      title: b.title,
      subtitle: `${b.date} • ${b.readTime}`,
    });
  });

  Object.entries(PHOTO_FOLDERS).forEach(([key, folder]) => {
    items.push({
      type: 'folder',
      id: 'folder',
      folderKey: key,
      title: folder.label.charAt(0).toUpperCase() + folder.label.slice(1),
      subtitle: `${folder.items.length} items`,
    });
  });

  openSourceContributions.forEach((org) => {
    org.prs.forEach((pr) => {
      items.push({
        type: 'opensource',
        id: 'about',
        title: `PR #${pr.prNumber} (${org.organization})`,
        subtitle: pr.title,
      });
    });
  });

  return items;
}
