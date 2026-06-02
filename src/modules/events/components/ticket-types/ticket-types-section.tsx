import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { Add, Delete, Edit, ToggleOff, ToggleOn } from '@mui/icons-material';

import { Loading, useConfirmDialog } from '@/shared/components';
import { formatCurrency, formatErrorForNotification } from '@/shared/utils';

import { TicketType } from '../../domain';
import { TicketTypeRepository } from '../../repositories';
import { TicketTypeFormDialog } from './ticket-type-form-dialog';

type TicketTypesSectionProps = {
  eventId: number;
};

export function TicketTypesSection({ eventId }: TicketTypesSectionProps) {
  const repository = new TicketTypeRepository();
  const { openConfirmDialog } = useConfirmDialog();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState<TicketType | undefined>(undefined);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['ticket-types', eventId],
    queryFn: () => repository.list({ eventId }),
    enabled: !!eventId,
  });

  function handleCreate() {
    setSelected(undefined);
    setDialogOpen(true);
  }

  function handleEdit(ticketType: TicketType) {
    setSelected(ticketType);
    setDialogOpen(true);
  }

  async function handleToggle(ticketType: TicketType) {
    try {
      await repository.toggleActive(ticketType.id);
      toast.success('Status atualizado!');
      refetch();
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    }
  }

  async function handleRemove(ticketType: TicketType) {
    const confirm = await openConfirmDialog({
      title: 'Deseja excluir o tipo de ingresso?',
      description: 'Essa é uma ação irreversível.',
    });

    if (!confirm) return;

    try {
      await repository.delete(ticketType.id);
      toast.success('Tipo de ingresso excluído!');
      refetch();
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    }
  }

  const ticketTypes = data ?? [];

  return (
    <Box width="100%">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h6">Tipos de Ingresso</Typography>
        <Button startIcon={<Add />} variant="contained" color="success" onClick={handleCreate}>
          Novo Tipo
        </Button>
      </Stack>

      {isLoading && <Loading />}

      {!isLoading && ticketTypes.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          Nenhum tipo de ingresso cadastrado.
        </Typography>
      )}

      <Stack divider={<Divider />} spacing={0}>
        {ticketTypes.map((ticketType) => (
          <Stack
            key={ticketType.id}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            py={1.5}
            spacing={2}
          >
            <Box flexGrow={1}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="subtitle1">{ticketType.name}</Typography>
                <Chip
                  size="small"
                  label={ticketType.active ? 'Ativo' : 'Inativo'}
                  color={ticketType.active ? 'success' : 'default'}
                />
              </Stack>
              {ticketType.description && (
                <Typography variant="body2" color="text.secondary">
                  {ticketType.description}
                </Typography>
              )}
              <Typography variant="body2" color="text.secondary">
                {formatCurrency(ticketType.price)} ·{' '}
                {ticketType.soldQuantity}/{ticketType.quantity} vendidos
              </Typography>
            </Box>

            <Stack direction="row" spacing={0.5}>
              <IconButton title="Editar" onClick={() => handleEdit(ticketType)}>
                <Edit fontSize="small" />
              </IconButton>
              <IconButton
                title={ticketType.active ? 'Desativar' : 'Ativar'}
                onClick={() => handleToggle(ticketType)}
              >
                {ticketType.active ? <ToggleOn fontSize="small" /> : <ToggleOff fontSize="small" />}
              </IconButton>
              <IconButton title="Excluir" onClick={() => handleRemove(ticketType)}>
                <Delete fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        ))}
      </Stack>

      <TicketTypeFormDialog
        open={dialogOpen}
        eventId={eventId}
        ticketType={selected}
        onClose={() => setDialogOpen(false)}
        onSaved={() => refetch()}
      />
    </Box>
  );
}
