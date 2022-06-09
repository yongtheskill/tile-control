import { useEffect, useState } from 'react';
import { getDefaultTheme } from '../../themeManager';
import { DarkModeIcon, DefaultIconDark, DefaultIconLight, LightModeIcon } from './ThemeIcons';

export default function ThemeDisplay({ themeId }: { themeId: number }) {
  const [actualTheme, setActualTheme] = useState(2);
  useEffect(() => {
    if (themeId !== 0) {
      setActualTheme(themeId);
      return;
    }
    setActualTheme(getDefaultTheme());
  }, [themeId]);
  return (
    <>
      <span className='inline-flex items-center justify-center p-2 dark:bg-main bg-main-dark rounded-md shadow-lg'>
        <h1 className='font-head font-semibold pr-1 dark:text-main-dark text-main'>
          {themeId === 0 ? 'Default' : themeId === 1 ? 'Light' : 'Dark'}
        </h1>
        {themeId === 0 ? (
          actualTheme === 1 ? (
            <DefaultIconLight />
          ) : (
            <DefaultIconDark />
          )
        ) : actualTheme === 1 ? (
          <DarkModeIcon />
        ) : (
          <LightModeIcon />
        )}
      </span>
    </>
  );
}
