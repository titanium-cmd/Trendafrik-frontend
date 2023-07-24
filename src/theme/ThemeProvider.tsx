import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import React, { useState } from 'react';
import { themeCreator } from './base';

export const ThemeContext = React.createContext(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (_themeName: string): void => { }
);

const ThemeProviderWrapper: React.FC<{
  children?: React.ReactNode;
}> = (props) => {
  const curThemeName = localStorage.getItem('appTheme') || 'GreyGooseTheme';
  const [themeName, _setThemeName] = useState(curThemeName);
  const theme = themeCreator(themeName);
  const setThemeName = (themeName: string): void => {
    localStorage.setItem('appTheme', themeName);
    _setThemeName(themeName);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeContext.Provider value={setThemeName}>
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      </ThemeContext.Provider>
    </StyledEngineProvider>
  );
};

export default ThemeProviderWrapper;
