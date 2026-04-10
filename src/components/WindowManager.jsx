import React from 'react';
import { AnimatePresence } from 'framer-motion';
import Window from './Window';
import { useDesktop } from '../context/DesktopContext';

/* Import all window content components */
import AboutWindow from '../windows/AboutWindow';
import WorksWindow from '../windows/WorksWindow';
import BlogWindow from '../windows/BlogWindow';
import ContactWindow from '../windows/ContactWindow';
import TerminalWindow from '../windows/TerminalWindow';
import SearchWindow from '../windows/SearchWindow';
import ExperienceWindow from '../windows/ExperienceWindow';
import SettingsWindow from '../windows/SettingsWindow';
import HelpWindow from '../windows/HelpWindow';
import ImageViewerWindow from '../windows/ImageViewerWindow';
import TextViewerWindow from '../windows/TextViewerWindow';
import MarkdownViewerWindow from '../windows/MarkdownViewerWindow';
import WelcomeWindow from '../windows/WelcomeWindow';
import FolderWindow from '../windows/FolderWindow';

/* New Windows */
import EducationWindow from '../windows/EducationWindow';
import SkillsWindow from '../windows/SkillsWindow';
import AchievementsWindow from '../windows/AchievementsWindow';
import ExtracurricularWindow from '../windows/ExtracurricularWindow';

const CONTENT_MAP = {
  about: AboutWindow,
  works: WorksWindow,
  blog: BlogWindow,
  contact: ContactWindow,
  terminal: TerminalWindow,
  search: SearchWindow,
  experience: ExperienceWindow,
  settings: SettingsWindow,
  help: HelpWindow,
  imageviewer: ImageViewerWindow,
  textviewer: TextViewerWindow,
  markdownviewer: MarkdownViewerWindow,
  welcome: WelcomeWindow,
  folder: FolderWindow,
  education: EducationWindow,
  skills: SkillsWindow,
  achievements: AchievementsWindow,
  extracurricular: ExtracurricularWindow,
};

export default function WindowManager() {
  const { windows } = useDesktop();

  return (
    <AnimatePresence>
      {windows
        .filter((w) => w.isOpen && !w.isMinimized)
        .map((w) => {
          const ContentComponent = CONTENT_MAP[w.component] || CONTENT_MAP[w.id];
          return (
            <Window key={w.id} windowData={w}>
              {ContentComponent ? (
                <ContentComponent
                  windowId={w.id}
                  windowData={w}
                  meta={w.meta}
                />
              ) : null}
            </Window>
          );
        })}
    </AnimatePresence>
  );
}
