import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';

import { ETicketStatus, Ticket } from '../domain';

const TICKET_STATUS_LABEL: Record<ETicketStatus, string> = {
  VALID: 'Válido',
  USED: 'Utilizado',
  CANCELLED: 'Cancelado',
};

const TICKET_STATUS_COLOR: Record<ETicketStatus, 'success' | 'warning' | 'default'> = {
  VALID: 'success',
  USED: 'warning',
  CANCELLED: 'default',
};

type TicketCardProps = {
  ticket: Ticket;
  showQrCode?: boolean;
};

export function TicketCard({ ticket, showQrCode = true }: TicketCardProps) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
          <Typography variant="subtitle1">
            {ticket.ticketType?.name ?? 'Ingresso'}
          </Typography>
          <Chip
            size="small"
            label={TICKET_STATUS_LABEL[ticket.status]}
            color={TICKET_STATUS_COLOR[ticket.status]}
          />
        </Stack>

        {ticket.event?.title && (
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {ticket.event.title}
          </Typography>
        )}

        {showQrCode && ticket.qrCode && (
          <Box
            display="flex"
            justifyContent="center"
            my={2}
            sx={{ bgcolor: '#fff', borderRadius: 1, p: 1 }}
          >
            <Box component="img" src={ticket.qrCode} alt={ticket.code} sx={{ width: 180, height: 180 }} />
          </Box>
        )}

        <Typography variant="caption" color="text.secondary">
          Código
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
          {ticket.code}
        </Typography>
      </CardContent>
    </Card>
  );
}
