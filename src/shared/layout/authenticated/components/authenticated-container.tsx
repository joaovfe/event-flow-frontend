import { PropsWithChildren } from 'react';
import { Stack } from '@mui/material';
import { PropsWithSx } from '@/shared/domain';

export function AuthenticatedContainer({
  children,
  sx,
}: PropsWithChildren & PropsWithSx) {
  return (
    <Stack
      component="main"
      sx={{
        padding: { md: 3, sm: 2, xs: 2 },
        gap: { md: 3, sm: 2, xs: 2 },
        flexGrow: 1,
        overflowX: 'hidden',
        ...sx,
      }}
    >
      {children}
    </Stack>
  );
}
