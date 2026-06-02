import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { CloseOutlined } from '@mui/icons-material';

import { IHttpError } from '@/shared/domain/interfaces';

type DefaultErrorHandlerProps = {
  error: IHttpError;
};

export function DefaultErrorHandler({ error }: DefaultErrorHandlerProps) {
  let customText = 'Erro desconhecido';

  if (error && error.statusCode === 401) {
    customText = 'Usuário não autorizado';
  }

  if (error && error.message) {
    customText = error.message;
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="60vh"
    >
      <Stack>
        <CloseOutlined sx={{ mx: 'auto', height: '42px', width: '42px' }} />

        <Typography variant="h6">{customText}</Typography>
      </Stack>
    </Box>
  );
}
