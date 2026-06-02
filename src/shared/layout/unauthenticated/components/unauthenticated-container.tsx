import { PropsWithChildren } from 'react';
import { Container } from '@mui/material';

import { PropsWithSx } from '@/shared/domain';

export function UnauthenticatedContainer({
  children,
  sx,
}: PropsWithChildren & PropsWithSx) {
  return (
    <Container
      component="main"
      sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: { sm: 3, xs: 2 },
        paddingY: { sm: 3, xs: 2 },
        ...sx,
      }}
    >
      {children}
    </Container>
  );
}
