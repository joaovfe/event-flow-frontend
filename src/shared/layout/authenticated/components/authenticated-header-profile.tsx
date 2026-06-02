import { Logout, Person } from '@mui/icons-material';
import {
  Avatar,
  ClickAwayListener,
  Divider,
  Fade,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography,
} from '@mui/material';
import { MouseEvent, useState } from 'react';

import { useAuth } from '@/modules/auth/hooks';

export function AuthenticatedHeaderProfile() {
  const { user, logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  function handleToggle(event: MouseEvent<HTMLElement>) {
    setOpen((previousValue) => !previousValue);
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setOpen(false);
    setAnchorEl(null);
  }

  return (
    <>
      <Avatar
        title="Opções do usuário"
        onClick={handleToggle}
        sx={{
          width: 40,
          height: 40,
          cursor: 'pointer',
          transition: '0.3s ease filter',
          backgroundColor: 'primary.contrastText',
          '&:hover': {
            filter: 'brightness(0.85)',
          },
        }}
      >
        <Person sx={{ color: 'primary.main' }} />
      </Avatar>

      <Popper
        placement="bottom-end"
        anchorEl={anchorEl}
        open={open}
        transition
        disablePortal
        sx={{ zIndex: 9 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper
              elevation={3}
              sx={{
                minWidth: 240,
                maxWidth: 300,
                marginTop: 1,
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <Stack gap={2} padding={2}>
                  <Stack direction="row" gap={2} alignItems="center">
                    <Avatar
                      alt="Foto de Perfil"
                      src={undefined}
                      sx={{
                        boxShadow: 3,
                        backgroundColor: 'primary.contrastText',
                        height: 60,
                        width: 60,
                      }}
                    >
                      <Person fontSize="large" sx={{ color: 'primary.main' }} />
                    </Avatar>

                    <Stack width="calc(100% - 80px)">
                      <Typography fontSize={16}>{user?.name}</Typography>

                      <Typography
                        fontSize={12}
                        fontWeight="bold"
                        color="primary.contrastText"
                      >
                        {user?.role?.name ?? ''}
                      </Typography>

                      <Typography
                        fontSize={12}
                        textOverflow="ellipsis"
                        overflow="hidden"
                      >
                        {user?.email}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Divider flexItem />

                  <List
                    dense
                    disablePadding
                    sx={{ borderRadius: 1, overflow: 'hidden' }}
                  >
                    <ListItem disablePadding>
                      <ListItemButton onClick={logout}>
                        <ListItemIcon sx={{ minWidth: '20px', marginRight: 2 }}>
                          <Logout
                            fontSize="small"
                            sx={{ color: 'text.primary' }}
                          />
                        </ListItemIcon>
                        <ListItemText primary="Sair" />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Stack>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
}
