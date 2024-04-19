import {useEffect} from 'react';

function useFavicon() {

  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const setFavicon = (darkMode) => {
      const favicon = document.querySelector('link[rel="icon"]');
      favicon.href = darkMode ? '/favicon-dark.ico' : '/favicon-light.ico';
    };

    setFavicon(prefersDarkMode);

    const handleThemeChange = (e) => {
      setFavicon(e.matches);
    };

    const colorSchemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    colorSchemeMediaQuery.addEventListener('change', handleThemeChange);

    return () => {
      colorSchemeMediaQuery.removeEventListener('change', handleThemeChange);
    };
  }, []);
}

export default useFavicon;