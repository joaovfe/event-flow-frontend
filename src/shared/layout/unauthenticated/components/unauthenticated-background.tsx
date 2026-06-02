import { Box } from '@mui/material';
import { PropsWithChildren } from 'react';

import { PropsWithSx } from '@/shared/domain';

export function UnauthenticatedBackground({
  children,
  sx,
}: PropsWithChildren & PropsWithSx) {

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        minWidth: '100%',
        minHeight: '100vh',
        backgroundColor: 'background.default',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
