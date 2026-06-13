import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, Grid2 as Grid, Skeleton, Stack, Typography } from '@mui/material';
import {
  ConfirmationNumberOutlined,
  EventOutlined,
  ReceiptLongOutlined,
} from '@mui/icons-material';
import { ReactNode } from 'react';

import { Page, PageCard, PageHeader, PageTitle } from '@/shared/components';

import { EventRepository } from '@/modules/events/repositories';
import { OrderRepository } from '@/modules/orders/repositories';

type StatCardProps = {
  label: string;
  value: number | string;
  icon: ReactNode;
};

function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
              width: 56,
              height: 56,
              borderRadius: 2,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
            }}
          >
            {icon}
          </Stack>
          <Stack>
            <Typography variant="h4" fontWeight={700}>
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export function Dashboard() {
  const eventRepository = new EventRepository();
  const orderRepository = new OrderRepository();

  const { data: events, isLoading: isLoadingEvents } = useQuery({
    queryKey: ['dashboard', 'events'],
    queryFn: () => eventRepository.list({ pagination: { take: 1, skip: 0 } }),
  });

  const { data: orders, isLoading: isLoadingOrders } = useQuery({
    queryKey: ['dashboard', 'orders'],
    queryFn: () => orderRepository.list({ pagination: { take: 100, skip: 0 } }),
  });

  const isLoading = isLoadingEvents || isLoadingOrders;

  const totalEvents = events?.total ?? 0;
  const totalOrders = orders?.total ?? 0;
  const totalTickets = (orders?.data ?? []).reduce(
    (acc, order) => acc + (order.tickets?.length ?? 0),
    0,
  );

  return (
    <Page>
      <PageHeader>
        <PageTitle withoutIconButton>Dashboard</PageTitle>
      </PageHeader>

      <PageCard>
        <Grid container width="100%" spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            {isLoading ? (
              <Skeleton variant="rounded" height={100} />
            ) : (
              <StatCard label="Eventos" value={totalEvents} icon={<EventOutlined />} />
            )}
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            {isLoading ? (
              <Skeleton variant="rounded" height={100} />
            ) : (
              <StatCard label="Pedidos" value={totalOrders} icon={<ReceiptLongOutlined />} />
            )}
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            {isLoading ? (
              <Skeleton variant="rounded" height={100} />
            ) : (
              <StatCard
                label="Ingressos vendidos"
                value={totalTickets}
                icon={<ConfirmationNumberOutlined />}
              />
            )}
          </Grid>
        </Grid>
      </PageCard>
    </Page>
  );
}
