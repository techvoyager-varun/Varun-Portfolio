import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { useDesktop } from '../context/DesktopContext';
import { projects } from '../data/projects';
import { blogPosts } from '../data/blogPosts';
import { ABOUT_TEXT, BUILD_LOG, SKILLS } from '../data/terminalCommands';
import { WINDOW_DEFS } from '../components/Dock';
import styles from '../styles/Terminal.module.css';

const AVAILABLE_COMMANDS = [
  'help', 'about', 'skills', 'works', 'blog', 'open', 'cat', 'ls',
  'whoami', 'date', 'clear', 'theme', 'neofetch', 'matrix', 'exit',
];

function TerminalWindow() {
  const { openWindow, toggleTheme } = useDesktop();
  const [history, setHistory] = useState([]);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [input, setInput] = useState('');
  const [showMatrix, setShowMatrix] = useState(false);
  const [ready, setReady] = useState(false);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);
  const canvasRef = useRef(null);

  // Typewriter startup
  useEffect(() => {
    const lines = [
      'Portfolio Terminal v1.1',
      "Type help to list all available commands.",
      'Interactive terminal app for quick navigation.',
      '',
    ];
    let timeout;
    let currentLine = 0;
    let currentChar = 0;
    const typed = [];

    const typeNext = () => {
      if (currentLine >= lines.length) {
        setReady(true);
        return;
      }
      const line = lines[currentLine];
      if (currentChar <= line.length) {
        const partial = line.slice(0, currentChar);
        const display = [...typed, partial];
        setHistory(display.map((text) => ({ type: 'output', text })));
        currentChar++;
        timeout = setTimeout(typeNext, 20);
      } else {
        typed.push(line);
        currentLine++;
        currentChar = 0;
        timeout = setTimeout(typeNext, 50);
      }
    };
    typeNext();
    return () => clearTimeout(timeout);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Auto-focus
  const focusInput = useCallback(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  // Matrix rain
  useEffect(() => {
    if (!showMatrix || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
    const cols = Math.floor(canvas.width / 14);
    const drops = Array(cols).fill(1);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()';
    
    const interval = setInterval(() => {
      ctx.fillStyle = 'rgba(26,26,18,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0F0';
      ctx.font = '14px monospace';
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * 14, drops[i] * 14);
        if (drops[i] * 14 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }, 40);

    const timer = setTimeout(() => {
      clearInterval(interval);
      setShowMatrix(false);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [showMatrix]);

  const addOutput = useCallback((lines) => {
    setHistory((prev) => [
      ...prev,
      ...lines.map((text) => ({ type: 'output', text })),
    ]);
  }, []);

  const executeCommand = useCallback((cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setHistory((prev) => [...prev, { type: 'command', text: trimmed }]);
    setCmdHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (command) {
      case 'help':
        addOutput([
          'Available commands:',
          '  about          Show about information',
          '  skills         List technical skills',
          '  works          List all projects',
          '  blog           List blog posts',
          '  open <app>     Open an app window (about, experience, works, blog, contact)',
          '  cat <file>     Read a file (about.txt, build-log.md)',
          '  ls             List desktop files',
          '  whoami         Show current user',
          '  date           Show current date and time',
          '  clear          Clear terminal',
          '  theme          Toggle light/dark theme',
          '  neofetch       System information',
          '  matrix         Surprise',
          '',
        ]);
        break;
      case 'about':
        addOutput(ABOUT_TEXT.split('\n'));
        break;
      case 'skills':
        addOutput(Object.entries(SKILLS).map(([k, v]) => `${k.padEnd(10)} ${v}`));
        break;
      case 'works':
        addOutput(projects.map((p) => `${!(p.name.length > 20) ? p.name.padEnd(22) : (p.name.substring(0, 19) + '...')} [${p.type}]`));
        break;
      case 'blog':
        addOutput(blogPosts.map((p) => `${!(p.title.length > 40) ? p.title.padEnd(42) : (p.title.substring(0, 39) + '...')} ${p.date}`));
        break;
      case 'open': {
        const app = args[0]?.toLowerCase();
        if (!app) { addOutput(['Usage: open <app>']); break; }
        if (app === 'terminal') { addOutput(['Terminal is already open.']); break; }
        if (WINDOW_DEFS[app]) {
          openWindow(app, WINDOW_DEFS[app]);
          addOutput([`Opening ${app.charAt(0).toUpperCase() + app.slice(1)}...`]);
        } else {
          addOutput([`Unknown app: ${app}. Try: about, experience, works, blog, contact`]);
        }
        break;
      }
      case 'cat': {
        const file = args[0];
        if (!file) { addOutput(['Usage: cat <file>']); break; }
        if (file === 'about.txt') { addOutput(ABOUT_TEXT.split('\n')); }
        else if (file === 'build-log.md') { addOutput(BUILD_LOG.split('\n')); }
        else { addOutput([`File not found: ${file}`]); }
        break;
      }
      case 'ls':
        addOutput([
          'about.txt     build-log.md',
        ]);
        break;
      case 'whoami':
        addOutput(['guest']);
        break;
      case 'date':
        addOutput([new Date().toString()]);
        break;
      case 'clear':
        setHistory([]);
        break;
      case 'theme':
        toggleTheme();
        addOutput(['Theme toggled.']);
        break;
      case 'neofetch':
        addOutput([
          '    /\\_/\\       User:     guest@portfolio',
          '   ( o.o )      Name:     Varun Rawat',
          '    > ^ <       Role:     Software Engineer',
          '   /|   |\\      Location: Alwar, Rajasthan, India',
          '  (_|   |_)     Stack:    React, Node.js, TypeScript',
          '                OS:       Portfolio OS v1.0',
          '                Uptime:   Since 2026',
          '                Shell:    portfolio-terminal v1.1',
        ]);
        break;
      case 'matrix':
        setShowMatrix(true);
        break;
      case 'exit':
        addOutput(['You cannot exit. There is no escape. 🔒']);
        break;
      case 'sudo':
        if (trimmed === 'sudo rm -rf /') {
          addOutput(['Nice try. This portfolio is protected. 🛡️']);
        } else {
          addOutput(['Permission denied. You are not in the sudoers file. This incident will be reported.']);
        }
        break;
      default:
        addOutput([`${command}: command not found. Type 'help' for available commands.`]);
    }
  }, [addOutput, openWindow, toggleTheme]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCmdHistory((prev) => {
        if (prev.length === 0) return prev;
        const newIndex = historyIndex === -1 ? prev.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(prev[newIndex] || '');
        return prev;
      });
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCmdHistory((prev) => {
        if (historyIndex === -1) return prev;
        const newIndex = historyIndex + 1;
        if (newIndex >= prev.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(prev[newIndex] || '');
        }
        return prev;
      });
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const partial = input.toLowerCase();
      const matches = AVAILABLE_COMMANDS.filter((c) => c.startsWith(partial));
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        addOutput([matches.join('  ')]);
      }
    }
  }, [input, historyIndex, executeCommand, addOutput]);

  return (
    <div
      className={styles.terminal}
      ref={terminalRef}
      onClick={focusInput}
      style={{ position: 'relative' }}
    >
      {showMatrix && (
        <canvas ref={canvasRef} className={styles.matrixCanvas} />
      )}

      <div className={styles.output}>
        {history.map((entry, i) => (
          <div key={i} className={styles.commandOutput}>
            {entry.type === 'command' ? (
              <div>
                <span className={styles.promptText}>guest@portfolio:~$ </span>
                {entry.text}
              </div>
            ) : (
              <div>{entry.text}</div>
            )}
          </div>
        ))}
      </div>

      {ready && (
        <div className={styles.promptLine}>
          <span className={styles.promptText}>guest@portfolio:~$ </span>
          <input
            ref={inputRef}
            className={styles.inputField}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck={false}
          />
        </div>
      )}
    </div>
  );
}

export default memo(TerminalWindow);
