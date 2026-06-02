import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material';
import { CalendarMonth, LocationOnOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { EPublicPath } from '@/core/router/domain/enums/public-path.enum';
import { Event } from '@/modules/events/domain';
import { formatCurrency, formatDate } from '@/shared/utils';

type EventCardProps = {
  event: Event;
};

function minPrice(event: Event): number | undefined {
  const prices = (event.ticketTypes ?? []).map((t) => t.price);
  if (prices.length === 0) return undefined;
  return Math.min(...prices);
}

export function EventCard({ event }: EventCardProps) {
  const navigate = useNavigate();
  const price = minPrice(event);

  function handleOpen() {
    navigate(EPublicPath.EVENT_DETAILS.replace(':slug', event.slug));
  }

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
      }}
    >
      {event.image ? (
        <CardMedia component="img" image={event.image} alt={event.title} sx={{ aspectRatio: '16/9' }} />
      ) : (
        <Box
          sx={{
            aspectRatio: '16/9',
            background: 'linear-gradient(135deg, #5a1c9c 0%, #2d0e4e 100%)',
          }}
        />
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="div" gutterBottom>
          {event.title}
        </Typography>

        <Stack spacing={0.5}>
          <Stack direction="row" spacing={1} alignItems="center" color="text.secondary">
            <CalendarMonth fontSize="small" />
            <Typography variant="body2">{formatDate(event.startDate, true)}</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center" color="text.secondary">
            <LocationOnOutlined fontSize="small" />
            <Typography variant="body2" noWrap>
              {event.location}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, pt: 0, justifyContent: 'space-between' }}>
        {price !== undefined ? (
          <Typography variant="body2" color="text.secondary">
            a partir de <strong>{formatCurrency(price)}</strong>
          </Typography>
        ) : (
          <Box />
        )}

        <Button size="small" variant="contained" color="success" onClick={handleOpen}>
          Ver evento
        </Button>
      </CardActions>
    </Card>
  );
}
