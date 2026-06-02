import { Container } from '@mui/material';

import { Logo } from '@/shared/components';
import { PropsWithSx } from '@/shared/domain';

export function UnauthenticatedHeader({ sx }: PropsWithSx) {

  return (
    <Container
      component="header"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: { sm: 3, xs: 2 },
        paddingY: { sm: 3, xs: 2 },
        flexDirection: { sm: 'row', xs: 'column' },
        ...sx,
      }}
    >
      <Logo
        maxWidth="180px"
        sx={{
          marginTop: { sm: 2, xs: 2 },
        }}
      />
    </Container>
  );
}
