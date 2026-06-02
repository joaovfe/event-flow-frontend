import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid2 as Grid,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import {
  Add,
  CalendarMonth,
  LocationOnOutlined,
  Remove,
} from '@mui/icons-material';

import { EPublicPath } from '@/core/router/domain/enums/public-path.enum';
import { formatCurrency, formatDate } from '@/shared/utils';

import { TicketType } from '../../domain';
import { EventRepository } from '../../repositories';
import { useCart } from '@/modules/cart/contexts';

function available(ticketType: TicketType): number {
  return Math.max(0, ticketType.quantity - ticketType.soldQuantity);
}

function TicketTypeRow({
  ticketType,
  eventSlug,
  eventTitle,
}: {
  ticketType: TicketType;
  eventSlug: string;
  eventTitle: string;
}) {
  const { addItem } = useCart();
  const max = available(ticketType);
  const [quantity, setQuantity] = useState(1);

  function handleAdd() {
    addItem({
      ticketTypeId: ticketType.id,
      eventSlug,
      eventTitle,
      ticketTypeName: ticketType.name,
      price: ticketType.price,
      quantity,
      maxAvailable: max,
    });
    toast.success('Adicionado ao carrinho!');
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'stretch', sm: 'center' }}
          spacing={2}
        >
          <Box>
            <Typography variant="subtitle1">{ticketType.name}</Typography>
            {ticketType.description && (
              <Typography variant="body2" color="text.secondary">
                {ticketType.description}
              </Typography>
            )}
            <Typography variant="h6" color="success.main" mt={0.5}>
              {formatCurrency(ticketType.price)}
            </Typography>
            {max > 0 ? (
              <Typography variant="caption" color="text.secondary">
                {max} disponíveis
              </Typography>
            ) : (
              <Chip size="small" label="Esgotado" color="default" sx={{ mt: 0.5 }} />
            )}
          </Box>

          {max > 0 && (
            <Stack direction="row" spacing={1} alignItems="center">
              <Stack direction="row" alignItems="center">
                <IconButton
                  size="small"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  <Remove fontSize="small" />
                </IconButton>
                <Typography minWidth={24} textAlign="center">
                  {quantity}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => setQuantity((q) => Math.min(max, q + 1))}
                  disabled={quantity >= max}
                >
                  <Add fontSize="small" />
                </IconButton>
              </Stack>

              <Button variant="contained" color="success" onClick={handleAdd}>
                Adicionar ao carrinho
              </Button>
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

export function EventDetails() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const repository = new EventRepository();

  const { data: event, isLoading } = useQuery({
    queryKey: ['event', 'public', slug],
    queryFn: () => repository.getPublic(slug!),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <Container sx={{ py: 4 }}>
        <Skeleton variant="rounded" height={320} sx={{ mb: 2 }} />
        <Skeleton width="60%" height={48} />
        <Skeleton width="40%" />
      </Container>
    );
  }

  if (!event) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Evento não encontrado.
        </Typography>
        <Button variant="outlined" color="success" onClick={() => navigate(EPublicPath.HOME)}>
          Voltar para a home
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      {event.image ? (
        <Box
          component="img"
          src={event.image}
          alt={event.title}
          sx={{ width: '100%', maxHeight: 380, objectFit: 'cover', borderRadius: 2, mb: 3 }}
        />
      ) : (
        <Box
          sx={{
            width: '100%',
            height: 280,
            borderRadius: 2,
            mb: 3,
            background: 'linear-gradient(135deg, #5a1c9c 0%, #1b0a30 100%)',
          }}
        />
      )}

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            {event.title}
          </Typography>

          <Stack spacing={1} mb={2}>
            <Stack direction="row" spacing={1} alignItems="center" color="text.secondary">
              <CalendarMonth fontSize="small" />
              <Typography variant="body1">
                {formatDate(event.startDate, true)} — {formatDate(event.endDate, true)}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center" color="text.secondary">
              <LocationOnOutlined fontSize="small" />
              <Typography variant="body1">{event.location}</Typography>
            </Stack>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
            {event.description}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Typography variant="h6" gutterBottom>
            Ingressos
          </Typography>

          <Stack spacing={2}>
            {(event.ticketTypes ?? []).length === 0 && (
              <Typography variant="body2" color="text.secondary">
                Nenhum ingresso disponível no momento.
              </Typography>
            )}

            {(event.ticketTypes ?? []).map((ticketType) => (
              <TicketTypeRow
                key={ticketType.id}
                ticketType={ticketType}
                eventSlug={event.slug}
                eventTitle={event.title}
              />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
