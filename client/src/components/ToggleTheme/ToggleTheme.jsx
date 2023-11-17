import React, { useState } from 'react';
import './ToggleTheme.css'; // Assuming this file contains your dark mode styles

const ToggleTheme = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-theme', !darkMode);
  };

  return (
    <input
      type="checkbox"
      id="toggle"
      checked={darkMode}
      onChange={toggleDarkMode}
    />
  );
};

export default ToggleTheme;
