import { PaletteMode, PaletteOptions } from '@mui/material';

export const palette: Record<PaletteMode, PaletteOptions> = {
  light: {
    mode: 'light',
    primary: {
      main: '#5a1c9c',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#fff',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
      contrastText: '#fff',
    },
    error: {
      main: '#d32f2f',
      light: '#ef5350',
      dark: '#c62828',
      contrastText: '#fff',
    },
    warning: {
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100',
      contrastText: '#fff',
    },
    info: {
      main: '#0288d1',
      light: '#03a9f4',
      dark: '#01579b',
      contrastText: '#fff',
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
      contrastText: '#fff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
  },
  dark: {
    mode: 'dark',
    primary: {
      main: '#272A2F',
      light: '#e3f2fd',
      dark: '#42a5f5',
      contrastText: 'rgba(255, 255, 255, 0.87)',
    },
    secondary: {
      main: '#ce93d8',
      light: '#f3e5f5',
      dark: '#ab47bc',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f',
      contrastText: '#fff',
    },
    warning: {
      main: '#ffa726',
      light: '#ffb74d',
      dark: '#f57c00',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    info: {
      main: '#29b6f6',
      light: '#4fc3f7',
      dark: '#0288d1',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    success: {
      main: '#FFDE59',
      light: '#81c784',
      dark: '#c9ac38',
      contrastText: '#fff',
    },
    text: {
      primary: '#fff',
      secondary: '#FFDE59',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
    background: {
      paper: '#212326',
      default: '#212326',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
  },
};
