import { useEffect } from 'react';

export default function ThemeToggle({ theme, setTheme }) {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.className = `theme-${savedTheme}`;
  }, [setTheme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    document.body.className = `theme-${nextTheme}`;
  };

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      <span aria-hidden="true">{theme === 'light' ? '◐' : '◑'}</span>
      <span>{theme === 'light' ? 'Dark theme' : 'Light theme'}</span>
    </button>
  );
}
