import { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';

import { formatCurrency } from '@/shared/utils';

import { TicketTypeFormData } from '../../domain';
import { TicketTypeFormDialog } from './ticket-type-form-dialog';

type PendingTicketTypesSectionProps = {
  value: TicketTypeFormData[];
  onChange: (items: TicketTypeFormData[]) => void;
};

export function PendingTicketTypesSection({ value, onChange }: PendingTicketTypesSectionProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined);

  function handleCreate() {
    setSelectedIndex(undefined);
    setDialogOpen(true);
  }

  function handleEdit(index: number) {
    setSelectedIndex(index);
    setDialogOpen(true);
  }

  function handleRemove(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  function handleSubmitLocal(data: TicketTypeFormData) {
    if (selectedIndex !== undefined) {
      onChange(value.map((item, i) => (i === selectedIndex ? data : item)));
    } else {
      onChange([...value, data]);
    }
  }

  return (
    <Box width="100%">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h6">Tipos de Ingresso</Typography>
        <Button startIcon={<Add />} variant="contained" color="success" onClick={handleCreate}>
          Novo Tipo
        </Button>
      </Stack>

      {value.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          Nenhum tipo de ingresso adicionado.
        </Typography>
      )}

      <Stack divider={<Divider />} spacing={0}>
        {value.map((ticketType, index) => (
          <Stack
            key={index}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            py={1.5}
            spacing={2}
          >
            <Box flexGrow={1}>
              <Typography variant="subtitle1">{ticketType.name}</Typography>
              {ticketType.description && (
                <Typography variant="body2" color="text.secondary">
                  {ticketType.description}
                </Typography>
              )}
              <Typography variant="body2" color="text.secondary">
                {formatCurrency(ticketType.price)} · {ticketType.quantity} disponíveis
              </Typography>
            </Box>

            <Stack direction="row" spacing={0.5}>
              <IconButton title="Editar" onClick={() => handleEdit(index)}>
                <Edit fontSize="small" />
              </IconButton>
              <IconButton title="Remover" onClick={() => handleRemove(index)}>
                <Delete fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        ))}
      </Stack>

      <TicketTypeFormDialog
        open={dialogOpen}
        ticketType={selectedIndex !== undefined ? value[selectedIndex] : undefined}
        onClose={() => setDialogOpen(false)}
        onSaved={() => {}}
        onSubmitLocal={handleSubmitLocal}
      />
    </Box>
  );
}
