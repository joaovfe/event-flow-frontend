import { Box, Typography } from '@mui/material';

import { PropsWithSx } from '../domain';

type LogoProps = PropsWithSx & {
  maxWidth?: string;
};

export function Logo({ maxWidth = '200px', sx }: LogoProps) {
  return (
    <Typography
      component="span"
      variant="h6"
      sx={{
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: 0.5,
        fontWeight: 700,
        letterSpacing: '-0.02em',
        lineHeight: 1,
        maxWidth,
        whiteSpace: 'nowrap',
        color: 'inherit',
        ...sx,
      }}
    >
      Event
      <Box component="span" sx={{ color: 'success.main' }}>
        Flow
      </Box>
    </Typography>
  );
}
