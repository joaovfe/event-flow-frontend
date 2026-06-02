import { CircularProgress, Stack } from '@mui/material';

export function Loading() {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
    >
      <CircularProgress title="Carregando..." />
    </Stack>
  );
}
