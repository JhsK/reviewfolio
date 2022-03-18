import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    PUBLIC_BLACK?: string;
    PUBLIC_WHITE?: string;
    HOME_GRAY?: string;
    spacing?: number;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    PUBLIC_BLACK?: string;
    PUBLIC_WHITE?: string;
    HOME_GRAY?: string;
    spacing?: number;
  }
}

const responsiveView = {
  HDPC: '1200px',
  PC: '980px',
  TABLET: '768px',
  TABLET_SM: '650px',
  MOBILE: '480px',
  MOBILE_SM: '400px',
};

export const lightTheme = createTheme({
  PUBLIC_BLACK: '#1E2022',
  PUBLIC_WHITE: '#fff',
  HOME_GRAY: '#f8f9fb',
  spacing: 16,
});

export type ThemeType = typeof lightTheme;
