import { Stack, Typography } from '@mui/material';

interface UnauthenticatedContentHeaderProps {
  title: string;
  description?: string;
}

export function UnauthenticatedContentHeader({
  title,
  description,
}: UnauthenticatedContentHeaderProps) {
  return (
    <Stack gap={1}>
      <Typography component="h2" variant="h5" fontWeight="bold">
        {title}
      </Typography>

      {description && <Typography variant="body1">{description}</Typography>}
    </Stack>
  );
}
