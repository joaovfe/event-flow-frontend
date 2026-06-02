import { Container, Typography, Link } from '@mui/material';
import { PropsWithSx } from '@/shared/domain';

export function UnauthenticatedFooter({ sx }: PropsWithSx) {
  return (
    <Container
      component="footer"
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: { sm: 3, xs: 2 },
        paddingY: { sm: 3, xs: 2 },
        ...sx,
      }}
    >
      <Typography variant="body2" fontWeight="light" textAlign="center">
        Desenvolvido por&nbsp;
        <Link
          href="https://synapsee.com.br"
          rel="noopener noreferrer"
          target="_blank"
          color="text.secondary" 
        >
          Synapse
        </Link>
      </Typography>
    </Container>
  );
}
