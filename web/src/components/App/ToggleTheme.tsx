import { useState, useEffect, useRef } from 'react';
import { getTheme, setTheme } from '../../themeManager';
import ThemeDisplay from './ThemeDisplay';

export default function ToggleTheme() {
  const [themeId, setThemeId] = useState(0);

  useEffect(() => {
    setThemeId(getTheme());
  }, []);

  const handleThemeChange = (id: number) => {
    setThemeId(id);
    setTheme(id);
  };

  return (
    <div
      className='fixed top-3 right-5 cursor-pointer select-none'
      id='themetoggler'
      onClick={(e) => {
        e.stopPropagation();
        if (themeId === 2) {
          handleThemeChange(0);
        } else {
          handleThemeChange(themeId + 1);
        }
      }}
    >
      <ThemeDisplay themeId={themeId} />
    </div>
  );
}
