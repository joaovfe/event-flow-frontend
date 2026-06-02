import { Components, Theme } from '@mui/material';

export const components: Components<Omit<Theme, 'components'>> = {
  MuiCssBaseline: {
    styleOverrides: ({ palette }) => ({
      '*': {
        scrollBehavior: 'smooth',
      },
      '*::-webkit-scrollbar': {
        height: 8,
        width: 8,
        background: 'transparent',
        borderRadius: 4,
      },
      '*::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: palette.primary.main,
        borderRadius: 4,
      },
      '.MuiInputBase-input:-webkit-autofill': {
        '-webkit-box-shadow': `0 0 0 30px ${palette.background.paper} inset !important`,
        '-webkit-text-fill-color': `${palette.text.primary} !important`,
      },
      '.MuiInputLabel-root.MuiFormLabel-root.Mui-focused': {
        color: palette.primary.contrastText,
      },
      '.MuiContainer-root.MuiContainer-maxWidthLg': {
        maxWidth: '1450px',
      },
    }),
  },

  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        textTransform: 'none',
        fontWeight: 600,
      },
    },
  },

  MuiLink: {
    styleOverrides: {
      root: ({ theme: { palette } }) => ({
        textDecoration: 'none',
        '&:hover': { textDecoration: 'underline', color: palette.success.dark },
      }),
    },
  },

  MuiBreadcrumbs: {
    defaultProps: {
      maxItems: 3,
    },
    styleOverrides: {
      root: ({ theme: { palette } }) => ({
        '&.custom-breadcrumbs': {
          color: palette.primary.contrastText,
          '& .MuiLink-root': {
            color: palette.primary.contrastText,
            '&:hover': {
              textDecoration: 'underline',
              color: palette.primary.contrastText,
            },
          },
        },
      }),
      separator: {
        fontWeight: 'bold',
        marginX: 0,
      },
    },
  },

  MuiDrawer: {
    styleOverrides: {
      root: ({ theme: { palette } }) => ({
        '&.custom-sidebar': {
          '.custom-sidebar-logo': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 48,
            height: 48,
            maxWidth: 192,
            maxHeight: {
              sm: 48,
              xs: 48,
            },
            '& svg': { transform: '0.3s ease' },
          },
          '.custom-sidebar-items': {
            overflowY: 'auto',
            overflowX: 'hidden',
            flexGrow: 1,
            '[open=true]': {
              overflowX: 'auto',
            },
            '& ul.MuiList-root': {
              padding: 6,
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            },
            '&::-webkit-scrollbar': {
              width: 0,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'transparent',
            },
          },
          '.custom-sidebar-button': {
            fontWeight: 'bold',
            borderRadius: 4,
            padding: '6px',
            gap: 16,
            '& .MuiListItemIcon-root': {
              color: palette.text.secondary,
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              borderRadius: 4,
              minWidth: 0,
              padding: 0,
              height: 40,
              width: 40,
            },
            '& .MuiListItemText-root': {
              color: palette.primary.contrastText,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              '& .MuiTypography-root': {
                fontSize: '1rem',
              },
            },
            '& .custom-sidebar-button-toggle': {
              color: palette.primary.contrastText,
            },
            '&.Mui-selected, &.Mui-selected:hover': {
              '.MuiListItemText-root': {
                '& .MuiTypography-root': {
                  fontWeight: 'bold',
                },
              },
              '.custom-sidebar-button-toggle': {
                color: palette.primary.main,
              },
            },
          },
          '& .MuiDivider-root': {
            backgroundColor: palette.primary.contrastText,
            marginRight: 8,
            marginLeft: 8,
          },
        },
      }),
    },
  },

  MuiSwitch: {
    styleOverrides: {
      switchBase: ({ theme: { palette } }) => ({
        '&.Mui-checked': {
          color: palette.success.main,
          '+ .MuiSwitch-track': {
            backgroundColor: palette.success.dark,
          },
        },
      }),
    },
  },

  MuiCheckbox: {
    styleOverrides: {
      root: ({ theme: { palette } }) => ({
        '&.Mui-checked': {
          color: palette.success.main,
        },
        '&.MuiCheckbox-indeterminate': {
          color: palette.success.dark,
        },
      }),
    },
  },
};
