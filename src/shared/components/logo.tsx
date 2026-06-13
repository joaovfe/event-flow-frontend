import { Box, Typography } from '@mui/material';

import { PropsWithSx } from '../domain';

type LogoProps = PropsWithSx & {
  maxWidth?: string;
  compact?: boolean;
};

export function Logo({ maxWidth = '200px', compact, sx }: LogoProps) {
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
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        transition: 'max-width 0.3s ease',
        color: 'inherit',
        ...sx,
      }}
    >
      {compact ? 'E' : 'Event'}
      <Box component="span" sx={{ color: 'success.main' }}>
        {compact ? 'F' : 'Flow'}
      </Box>
    </Typography>
  );
}
