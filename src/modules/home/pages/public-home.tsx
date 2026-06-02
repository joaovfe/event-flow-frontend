import { Search as SearchIcon } from '@mui/icons-material';
import {
  Box,
  Container,
  Grid2,
  InputAdornment,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';

import { EventRepository } from '@/modules/events/repositories';
import { EventCard } from '@/modules/home/components';

type PublicHomeContext = {
  search: string;
  setSearch: (value: string) => void;
};

export function PublicHome() {
  const { search, setSearch } = useOutletContext<PublicHomeContext>();

  const repository = useMemo(() => new EventRepository(), []);

  const { data: events, isLoading } = useQuery({
    queryKey: ['events', 'public-list', search],
    queryFn: () => repository.listPublic({ search, take: 12, skip: 0 }),
    refetchOnMount: true,
  });

  const list = events?.data ?? [];

  return (
    <Stack>
      <Box
        sx={{
          background: 'linear-gradient(135deg, #5a1c9c 0%, #1b0a30 100%)',
          py: { xs: 6, md: 10 },
          mb: 4,
        }}
      >
        <Container>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Viva experiências inesquecíveis
          </Typography>
          <Typography variant="h6" color="rgba(255,255,255,0.8)" sx={{ maxWidth: 640 }}>
            Encontre os melhores eventos e garanta seus ingressos em poucos cliques com o Event Flow.
          </Typography>
        </Container>
      </Box>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
          flexWrap="wrap"
          gap={2}
        >
          <Typography variant="h5">Eventos disponíveis</Typography>
          <TextField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            placeholder="Procurar eventos"
            sx={{ width: 260, display: { xs: 'inline-flex', sm: 'none' } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        {isLoading && (
          <Grid2 container spacing={2}>
            {Array.from({ length: 6 }).map((_, index) => (
              <Grid2 key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                <Skeleton variant="rounded" height={280} />
              </Grid2>
            ))}
          </Grid2>
        )}

        {!isLoading && list.length === 0 && (
          <Box py={8} textAlign="center">
            <Typography variant="h6" color="text.secondary">
              Nenhum evento encontrado.
            </Typography>
          </Box>
        )}

        {!isLoading && list.length > 0 && (
          <Grid2 container spacing={2} pb={6}>
            {list.map((event) => (
              <Grid2 key={event.uuid} size={{ xs: 12, sm: 6, md: 4 }}>
                <EventCard event={event} />
              </Grid2>
            ))}
          </Grid2>
        )}
      </Container>
    </Stack>
  );
}
