import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Chip, Divider, Grid2 as Grid, Stack, Typography } from '@mui/material';

import { Loading, Page, PageCard, PageHeader, PageTitle } from '@/shared/components';
import { formatCurrency, formatDate } from '@/shared/utils';

import { OrderRepository } from '../../repositories';
import { ORDER_STATUS_COLOR, ORDER_STATUS_LABEL } from '../../domain';
import { TicketCard } from '../../components';

export function OrderDetails() {
  const { id } = useParams<{ id: string }>();
  const orderId = Number(id);

  const repository = new OrderRepository();

  const { data: order, isLoading } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => repository.get(orderId),
    enabled: !!orderId,
  });

  return (
    <Page>
      <PageHeader>
        <PageTitle>Detalhes do Pedido</PageTitle>
      </PageHeader>

      <PageCard>
        {isLoading && <Loading />}

        {!isLoading && order && (
          <Stack width="100%" spacing={3}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
              <Stack>
                <Typography variant="h6">{order.customerName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {order.customerEmail}
                </Typography>
                {order.customerDocument && (
                  <Typography variant="body2" color="text.secondary">
                    CPF: {order.customerDocument}
                  </Typography>
                )}
              </Stack>

              <Stack alignItems="flex-end" spacing={1}>
                <Chip
                  label={ORDER_STATUS_LABEL[order.status]}
                  color={ORDER_STATUS_COLOR[order.status]}
                />
                <Typography variant="h6">{formatCurrency(order.total)}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDate(order.createdAt ?? '', true)}
                </Typography>
              </Stack>
            </Stack>

            <Divider />

            <Typography variant="subtitle1">
              Ingressos ({order.tickets?.length ?? 0})
            </Typography>

            <Grid container spacing={2}>
              {(order.tickets ?? []).map((ticket) => (
                <Grid key={ticket.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <TicketCard ticket={ticket} />
                </Grid>
              ))}
            </Grid>
          </Stack>
        )}
      </PageCard>
    </Page>
  );
}
