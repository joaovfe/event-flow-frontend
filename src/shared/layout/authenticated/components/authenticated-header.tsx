import {
  Theme,
  IconButton,
  useMediaQuery,
  AppBar,
  Toolbar,
  Button,
} from '@mui/material';
import { Menu, StorefrontOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { AuthenticatedHeaderBreadcrumbs } from './authenticated-header-breadcrumbs';
import { AuthenticatedHeaderProfile } from './authenticated-header-profile';
import { useSidebar } from './authenticated-sidebar';
import { EPublicPath } from '@/core/router';

export function AuthenticatedHeader() {
  const { toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  return (
    <>
      <AppBar
        position="static"
        square
        elevation={0}
        sx={{ backgroundColor: 'primary.main' }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          {isMobile && (
            <IconButton onClick={toggleSidebar} title="Menu">
              <Menu sx={{ color: 'primary.contrastText' }} />
            </IconButton>
          )}

          {!isMobile && <AuthenticatedHeaderBreadcrumbs />}

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Button
              variant="outlined"
              startIcon={<StorefrontOutlined />}
              onClick={() => navigate(EPublicPath.HOME)}
              sx={{
                color: 'primary.contrastText',
                borderColor: 'primary.contrastText',
                '&:hover': {
                  borderColor: 'primary.contrastText',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Ver site
            </Button>
            <AuthenticatedHeaderProfile />
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}
