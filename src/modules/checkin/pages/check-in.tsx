import { useState } from 'react';
import axios from 'axios';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { CancelOutlined, CheckCircleOutline, ErrorOutline } from '@mui/icons-material';

import { Loading, Page, PageCard, PageHeader, PageTitle } from '@/shared/components';
import { formatErrorForNotification } from '@/shared/utils';

import { CheckInResponse, ECheckInResult } from '../domain';
import { CheckInRepository } from '../repositories';

type ResultState =
  | { kind: ECheckInResult; response: CheckInResponse }
  | { kind: 'INVALID'; message: string }
  | null;

const VISUALS: Record<
  ECheckInResult | 'INVALID',
  { color: string; title: string; icon: JSX.Element }
> = {
  SUCCESS: {
    color: 'success.main',
    title: 'VÁLIDO · Entrada liberada',
    icon: <CheckCircleOutline sx={{ fontSize: 72 }} />,
  },
  ALREADY_USED: {
    color: 'warning.main',
    title: 'JÁ UTILIZADO',
    icon: <ErrorOutline sx={{ fontSize: 72 }} />,
  },
  CANCELLED: {
    color: 'error.main',
    title: 'CANCELADO',
    icon: <CancelOutlined sx={{ fontSize: 72 }} />,
  },
  INVALID: {
    color: 'error.main',
    title: 'INVÁLIDO',
    icon: <CancelOutlined sx={{ fontSize: 72 }} />,
  },
};

export function CheckInPage() {
  const repository = new CheckInRepository();

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultState>(null);

  async function handleValidate() {
    if (!code.trim() || loading) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await repository.confirm(code.trim());
      setResult({ kind: response.result, response });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setResult({ kind: 'INVALID', message: 'Ingresso não encontrado.' });
      } else {
        setResult({ kind: 'INVALID', message: formatErrorForNotification(error) });
      }
    } finally {
      setLoading(false);
    }
  }

  const visual = result ? VISUALS[result.kind] : null;
  const ticket = result && 'response' in result ? result.response.ticket : undefined;
  const message =
    result && 'response' in result ? result.response.message : result?.message ?? '';

  return (
    <Page>
      <PageHeader>
        <PageTitle home>Check-in</PageTitle>
      </PageHeader>

      <PageCard>
        <Stack width="100%" spacing={3}>
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <TextField
              fullWidth
              size="small"
              label="Código do ingresso"
              placeholder="Cole ou digite o código"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleValidate()}
            />
            <Button
              variant="contained"
              color="success"
              size="large"
              onClick={handleValidate}
              disabled={loading || !code.trim()}
            >
              Validar
            </Button>
          </Stack>

          {loading && <Loading />}

          {!loading && visual && (
            <Box
              sx={{
                borderRadius: 2,
                p: 4,
                textAlign: 'center',
                color: visual.color,
                border: '2px solid',
                borderColor: visual.color,
              }}
            >
              <Box sx={{ color: visual.color }}>{visual.icon}</Box>
              <Typography variant="h5" sx={{ mt: 1, fontWeight: 600 }}>
                {visual.title}
              </Typography>
              {message && (
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                  {message}
                </Typography>
              )}

              {ticket && (
                <Stack spacing={0.5} mt={2} alignItems="center">
                  {ticket.event?.title && (
                    <Typography variant="subtitle1" color="text.primary">
                      {ticket.event.title}
                    </Typography>
                  )}
                  {ticket.ticketType?.name && (
                    <Typography variant="body2" color="text.secondary">
                      {ticket.ticketType.name}
                    </Typography>
                  )}
                  <Typography variant="body2" sx={{ fontFamily: 'monospace' }} color="text.secondary">
                    {ticket.code}
                  </Typography>
                </Stack>
              )}
            </Box>
          )}
        </Stack>
      </PageCard>
    </Page>
  );
}
