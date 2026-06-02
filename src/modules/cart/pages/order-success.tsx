import { Link as RouterLink, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid2 as Grid,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

import { EPublicPath } from '@/core/router/domain/enums/public-path.enum';
import { formatCurrency } from '@/shared/utils';

import { OrderRepository } from '@/modules/orders/repositories';
import { TicketCard } from '@/modules/orders/components';

export function OrderSuccessPage() {
  const { uuid } = useParams<{ uuid: string }>();

  const repository = new OrderRepository();

  const { data: order, isLoading } = useQuery({
    queryKey: ['order', 'public', uuid],
    queryFn: () => repository.getPublic(uuid!),
    enabled: !!uuid,
  });

  if (isLoading) {
    return (
      <Container sx={{ py: 6 }}>
        <Skeleton width="50%" height={48} />
        <Skeleton variant="rounded" height={240} sx={{ mt: 2 }} />
      </Container>
    );
  }

  if (!order) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Pedido não encontrado.
        </Typography>
        <Button component={RouterLink} to={EPublicPath.HOME} variant="outlined" color="success">
          Voltar para a home
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 6 }}>
      <Stack alignItems="center" textAlign="center" mb={4}>
        <CheckCircle sx={{ fontSize: 72, color: 'success.main' }} />
        <Typography variant="h4" fontWeight={700} mt={1}>
          Pagamento aprovado!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Olá {order.customerName}, seu pedido foi confirmado. Apresente os QR codes na entrada.
        </Typography>
      </Stack>

      <Box maxWidth={480} mx="auto" mb={4}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            Pedido
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
            {order.uuid}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            E-mail
          </Typography>
          <Typography variant="body2">{order.customerEmail}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            Total
          </Typography>
          <Typography variant="body2">{formatCurrency(order.total)}</Typography>
        </Stack>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Typography variant="h6" mb={2}>
        Seus ingressos
      </Typography>

      <Grid container spacing={2}>
        {(order.tickets ?? []).map((ticket) => (
          <Grid key={ticket.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <TicketCard ticket={ticket} />
          </Grid>
        ))}
      </Grid>

      <Stack alignItems="center" mt={5}>
        <Button component={RouterLink} to={EPublicPath.HOME} variant="contained" color="success">
          Voltar para a home
        </Button>
      </Stack>
    </Container>
  );
}
