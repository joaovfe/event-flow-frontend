import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import {
  CssBaseline,
  PaletteMode,
  ThemeProvider as MUIThemeProvider,
  createTheme,
  useMediaQuery,
  Theme,
} from '@mui/material';
import { ptBR } from '@mui/material/locale';
import { useLocalStorage } from 'usehooks-ts';

import { components } from './components';
import { palette } from './palette';
import { LOCAL_STORAGE_KEY } from '@/shared/domain/constants/localStorageKey.constant';

interface ITheme {
  themeMode: PaletteMode;
  theme?: Theme;
  changeThemeMode: (_mode: PaletteMode) => void;
  toggleThemeMode: () => void;
}

const ThemeContext = createContext<ITheme>({
  themeMode: 'light',
  changeThemeMode: () => {},
  toggleThemeMode: () => {},
});

export function ThemeProvider({ children }: PropsWithChildren) {
  const [mode, setMode] = useLocalStorage<PaletteMode>(
    LOCAL_STORAGE_KEY.THEME_MODE,
    useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light',
  );

  const toggleThemeMode = useCallback(
    () => setMode((prev) => (prev === 'dark' ? 'light' : 'dark')),
    [setMode],
  );

  const changeThemeMode = useCallback(
    (value: PaletteMode) => setMode(value),
    [setMode],
  );

  const theme = useMemo(
    () =>
      createTheme(
        {
          palette: palette['dark'],
          components,
          typography: {
            fontFamily: ['Poppins', 'sans-serif'].join(','),
          },
        },
        ptBR,
      ),
    [mode],
  );

  return (
    <ThemeContext.Provider
      value={{ themeMode: mode, changeThemeMode, toggleThemeMode, theme }}
    >
      <MUIThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
