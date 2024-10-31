import { useEffect, useState } from "react";

export const useModeTheme = () => {
  const [theme, setTheme] = useState(() => {
    return window.localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const setDarkTheme = () => setTheme('dark');
  const setLightTheme = () => setTheme('light');
  
  return { toggleTheme, setDarkTheme, setLightTheme, theme };
};
