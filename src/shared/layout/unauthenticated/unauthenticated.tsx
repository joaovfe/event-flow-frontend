import { createTheme, CssBaseline, Theme, ThemeProvider } from '@mui/material';
import { Outlet, Navigate } from 'react-router-dom';

import { EAuthenticatedPath } from '@/core/router';
import { palette } from '@/core/theme';

import { useAuth } from '@/modules/auth/hooks';

import {
  UnauthenticatedHeader,
  UnauthenticatedFooter,
  UnauthenticatedBackground,
  UnauthenticatedContainer,
} from './components';

function unauthenticatedTheme(theme: Theme) {
  return createTheme({
    ...theme,
    palette: {
      ...palette.dark,
    },
  });
}

export function Unauthenticated() {
  const { authenticated } = useAuth();

  if (authenticated) return <Navigate to={EAuthenticatedPath.DASHBOARD} replace />;

  return (
    <ThemeProvider theme={(theme: Theme) => unauthenticatedTheme(theme)}>
      <CssBaseline />

      <UnauthenticatedBackground>
        <UnauthenticatedHeader />

        <UnauthenticatedContainer>
          <Outlet />
        </UnauthenticatedContainer>

        <UnauthenticatedFooter />
      </UnauthenticatedBackground>
    </ThemeProvider>
  );
}
