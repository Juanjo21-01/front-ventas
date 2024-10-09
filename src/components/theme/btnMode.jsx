import { useState, useEffect } from 'react';

export const BtnModeTheme = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className='text-center p-5'>
      <button onClick={toggleTheme} className='btn primary-theme'>Mode</button>
    </div>
  );
}
