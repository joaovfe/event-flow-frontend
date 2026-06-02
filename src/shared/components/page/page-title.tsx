import {
  IconButton,
  Stack,
  Typography,
  TypographyProps,
  useMediaQuery,
} from '@mui/material';
import { ArrowBack, Home } from '@mui/icons-material';
import { Link } from 'react-router-dom';

type PageTitleProps = TypographyProps & {
  home?: boolean;
  withoutIconButton?: boolean;
};

export function PageTitle({
  children,
  home,
  withoutIconButton,
  ...props
}: PageTitleProps) {
  const isMobile: boolean = useMediaQuery((theme: any) =>
    theme.breakpoints.down('sm'),
  );

  return (
    <Stack
      flexGrow={isMobile ? '1' : undefined}
      flexDirection="row"
      alignItems="center"
      gap={1}
    >
      {!withoutIconButton && (
        <IconButton
          component={Link}
          to={home ? '/' : '../'}
          title={home ? 'Página Inicial' : 'Voltar'}
        >
          {home ? <Home /> : <ArrowBack />}
        </IconButton>
      )}

      <Typography component="h2" variant="h5" {...props}>
        {children}
      </Typography>
    </Stack>
  );
}
